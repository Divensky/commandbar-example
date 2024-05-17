export interface EventItem {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
}

export type User = {
  name: string;
  id: number;
  icon?: string;
};

export type Metadata = {
  meta?: string;
};

export type CustomComponent = {
  mount: (node: HTMLElement) => CustomComponentInstance;
};

export type CustomComponentInstance = {
  render: (data: User, metadata: Metadata) => void;
  unmount: () => void;
};
