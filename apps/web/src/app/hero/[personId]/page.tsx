'use client';

import type { FC } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { ReactFlow, useEdgesState, useNodesState } from 'reactflow';
import axios from 'axios';
import 'reactflow/dist/base.css';
import type { Person } from '../../../types/person';
import { getHeroById } from '../../../api/people';
import { getFilmById } from '../../../api/films';
import { CustomNode } from '../../../components/custom-node';
import { SkeletonNode } from '../../../components/skeletons/skeleton-node';
import type { Film } from '../../../types/film';
import { getVehicleById } from '../../../api/vehicles';
import type { Vehicle } from '../../../types/vehicle';

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const nodeTypes = {
  custom: CustomNode,
  skeleton: SkeletonNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'skeleton',
    position: { x: 10, y: 10 },
    data: {
      label: '1',
    },
  },
  {
    id: '2',
    type: 'skeleton',
    position: { x: 110, y: 150 },
    data: {
      label: '2',
    },
  },
  {
    id: '3',
    type: 'skeleton',
    position: { x: 310, y: 150 },
    data: {
      label: '3',
    },
  },
  {
    id: '4',
    type: 'skeleton',
    position: { x: 210, y: 300 },
    data: {
      label: '4',
    },
  },
];

const initialEdges = [
  { id: '1->2', source: '1', target: '2' },
  { id: '1->3', source: '1', target: '3' },
  { id: '2->4', source: '2', target: '4' },
];

interface Props {
  params: {
    personId: string;
  };
}

interface ProcessedVehicles {
  filmId: number;
  herosVehicles: Vehicle[];
}

const PersonGraph: FC<Props> = ({ params }): JSX.Element => {
  const [nodes, setNodes, _onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, _onEdgesChange] = useEdgesState(initialEdges);

  const [hero, setHero] = useState<Person>();
  const [films, setFilms] = useState<Film[]>([]);
  const [vehicles, setVehicles] = useState<ProcessedVehicles[]>([]);

  const loadData = useCallback(async () => {
    try {
      const heroInfo = await getHeroById(params.personId);
      const filmPromises = heroInfo.films.map((filmId) => getFilmById(filmId.toString()));
      const filmsWithHero = await axios.all(filmPromises);
      const herosVehiclesInFilms = await axios.all(
        filmsWithHero
          .map((film) => ({
            filmId: film.id,
            herosVehicles: film.vehicles.filter((vehicleId) =>
              heroInfo.vehicles.includes(vehicleId)
            ),
          }))
          .filter((filmWithVehiclesIds) => filmWithVehiclesIds.herosVehicles.length)
          .map(async (filmWithVehiclesIds) => {
            const vehiclePromises = filmWithVehiclesIds.herosVehicles.map((vehicleId) =>
              getVehicleById(vehicleId.toString())
            );

            const filmWithVehicles = await axios.all(vehiclePromises);

            return {
              filmId: filmWithVehiclesIds.filmId,
              herosVehicles: filmWithVehicles,
            };
          })
      );

      setVehicles(herosVehiclesInFilms);
      setFilms(filmsWithHero);
      setHero(heroInfo);
    } catch (err) {
      throw new Error(String(err));
    }
  }, [params.personId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    if (hero && films.length) {
      const heroNode = {
        id: hero.id.toString(),
        type: 'custom',
        position: { x: 10, y: 10 },
        data: {
          label: hero.name,
        },
      };

      const horizontalGapNodes = 200;

      const filmsNodes = films.map((film, i) => ({
        id: film.id.toString(),
        type: 'custom',
        position: { x: horizontalGapNodes * (i + 0.5) + 10, y: 150 },
        data: {
          label: film.title,
        },
      }));

      let allVehiclesNodes: {
        id: string;
        type: string;
        position: { x: number; y: number };
        data: { label: string };
      }[] = [];

      let edgesFromFilmsToVehicle: { id: string; source: string; target: string }[] = [];

      if (vehicles.length) {
        allVehiclesNodes = vehicles.reduce<
          {
            id: string;
            type: string;
            position: { x: number; y: number };
            data: { label: string };
          }[]
        >((allVehiclesStorage, vehicleWithFilmId) => {
          const vehiclesNodes = vehicleWithFilmId.herosVehicles.map((vehicle, i) => ({
            id: vehicle.id.toString(),
            type: 'custom',
            position: { x: horizontalGapNodes * (i + 1) + 10, y: 300 },
            data: {
              label: vehicle.model,
            },
          }));

          return [...allVehiclesStorage, ...vehiclesNodes];
        }, []);

        edgesFromFilmsToVehicle = allVehiclesNodes.map((vehicleNode) => {
          const relatedFilm = films.find((film) => film.vehicles.includes(Number(vehicleNode.id)));

          return relatedFilm
            ? {
                id: `${relatedFilm.id}->${vehicleNode.id}`,
                source: relatedFilm.id.toString(),
                target: vehicleNode.id,
              }
            : {
                id: '',
                source: '',
                target: '',
              };
        });
      }

      const edgesFromHeroNode = filmsNodes.map((filmNode) => ({
        id: `${heroNode.id}->${filmNode.id}`,
        source: heroNode.id,
        target: filmNode.id,
      }));

      setEdges([...edgesFromHeroNode, ...edgesFromFilmsToVehicle]);
      setNodes([heroNode, ...filmsNodes, ...allVehiclesNodes]);
    }
  }, [hero, films.length, setNodes, vehicles, films, setEdges]);

  return (
    <div className="h-screen">
      <ReactFlow defaultViewport={defaultViewport} edges={edges} nodeTypes={nodeTypes} nodes={nodes} />
    </div>
  );
};

export default PersonGraph;
