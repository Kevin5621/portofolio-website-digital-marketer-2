import { rumahBahasaData } from './rumah-bahasa';
import { ortistData } from './ortist';
import { BrandData } from '../common/types';
import { kronjuData } from './kronju';
import { binjasiimensamaptaData } from './binjasiimen-samapta';

// Map of all projects by ID with index signature
export const projectsData: { [key: string]: BrandData } = {
  'rumah-bahasa': rumahBahasaData,
  'ortist': ortistData,
  'kronju': kronjuData,
  'binjasiimen-samapta': binjasiimensamaptaData,
};

// Function to get project data by ID
export const getProjectData = (id: string) => {
  return projectsData[id] || null;
};

// List of all projects for navigation
export const allProjects = Object.values(projectsData);