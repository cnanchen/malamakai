export interface Ocean {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
  description?: string;
  label?: '🐚' | '🦐' | '🦀' | '🦞' | '🐟' | '🐠' | '🐡' | '🐙' | '🦑' | '🐬' | '🦈' | '🐋' ;
}

export interface Subscription {
  active?: boolean;
}