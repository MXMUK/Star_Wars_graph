'use client';

/* eslint-disable no-unused-vars -- delete me */
/* eslint-disable @typescript-eslint/no-unused-vars -- delete me  */

import type { FC } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { ReactFlow, useEdgesState, useNodesState } from 'reactflow';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'reactflow/dist/base.css';
import type { Person } from '../../../types/person';
import { getHeroById } from '../../../api/people';
import { getFilmById } from '../../../api/films';
import { CustomNode } from '../../../components/custom-node';
import type { Film } from '../../../types/film';
import { getVehicleById } from '../../../api/vehicles';
import type { Vehicle } from '../../../types/vehicle';

// const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  { id: '1', type: 'custom', position: { x: 10, y: 10 }, data: '1' },
  { id: '2', type: 'custom', position: { x: 10, y: 150 }, data: '2' },
  { id: '3', type: 'custom', position: { x: 200, y: 150 }, data: '3' },
];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }, { id: 'e1-3', source: '1', target: '3' }];

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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const router = useRouter();

  const [hero, setHero] = useState<Person>();
  const [films, setFilms] = useState<Film[]>([]);
  const [vehicles, setVehicles] = useState<ProcessedVehicles[]>([]);

  // const [isLoading, setIsLoading] = useState(true);

  // const loadData = useCallback(async () => {
  //   setIsLoading(true);

  //   try {
  //     const heroInfo = await getHeroById(params.personId);
  //     const filmPromises = heroInfo.films.map((filmId) => getFilmById(filmId.toString()));
  //     const filmsWithHero = await axios.all(filmPromises);
  //     const herosVehiclesInFilms = await axios.all(
  //       filmsWithHero
  //         .map((film) => ({
  //           filmId: film.id,
  //           herosVehicles: film.vehicles.filter((vehicleId) =>
  //             heroInfo.vehicles.includes(vehicleId)
  //           ),
  //         }))
  //         .filter((filmWithVehiclesIds) => filmWithVehiclesIds.herosVehicles.length)
  //         .map(async (filmWithVehiclesIds) => {
  //           const vehiclePromises = filmWithVehiclesIds.herosVehicles.map((vehicleId) =>
  //             getVehicleById(vehicleId.toString())
  //           );

  //           const filmWithVehicles = await axios.all(vehiclePromises);

  //           return {
  //             filmId: filmWithVehiclesIds.filmId,
  //             herosVehicles: filmWithVehicles,
  //           };
  //         })
  //     );

  //     setVehicles(herosVehiclesInFilms);
  //     setFilms(filmsWithHero);
  //     setHero(heroInfo);
  //   } catch (err) {
  //     throw new Error(String(err));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [params.personId]);

  // useEffect(() => {
  //   void loadData();
  // }, [loadData]);

  // useEffect(() => {
  //   if (hero && films.length) {
  //     const heroNode = [
  //       {
  //         id: hero.id.toString(),
  //         type: 'custom',
  //         position: { x: 10, y: 10 },
  //         data: JSON.stringify(hero),
  //       },
  //     ];

  //     const horizontalGapNodes = 200;

  //     const filmsNodes = films.map((film, i) => ({
  //       id: film.id.toString(),
  //       type: 'custom',
  //       position: { x: horizontalGapNodes * i + 10, y: 150 },
  //       data: JSON.stringify(film),
  //     }));

  //     let allVehiclesNodes: {
  //       id: string;
  //       type: string;
  //       position: { x: number; y: number };
  //       data: string;
  //     }[] = [];

  //     if (vehicles.length) {
  //       allVehiclesNodes = vehicles.reduce<
  //         { id: string; type: string; position: { x: number; y: number }; data: string }[]
  //       >((allVehiclesStorage, vehicleWithFilmId) => {
  //         const vehiclesNodes = vehicleWithFilmId.herosVehicles.map((vehicle, i) => ({
  //           id: vehicle.id.toString(),
  //           type: 'custom',
  //           position: { x: horizontalGapNodes * i + 10, y: 300 },
  //           data: JSON.stringify(vehicle),
  //         }));

  //         return [...allVehiclesStorage, ...vehiclesNodes];
  //       }, []);
  //     }

  //     setNodes([...heroNode, ...filmsNodes, ...allVehiclesNodes]);
  //   }
  // }, [hero, films.length, setNodes, vehicles, films]);

  return (
    <div className="h-screen">
      <ReactFlow edges={edges} nodeTypes={nodeTypes} nodes={nodes} />
    </div>
  );
};

export default PersonGraph;
