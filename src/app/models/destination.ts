export interface Destination {
  id: number;
  name: string;
  description: string;
  location: string;
  attractions: string[];  // Changed to array to match TextField content
  image?: string;        // Will handle Django's image path
  activities?: string[]; // Changed to array
}