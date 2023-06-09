export interface GroceryItem {
  _id: string;
  name: string;
  slug: string;
  categoryId: string;
  isSelected?: boolean;
}

export interface GroceryCategory {
  _id: string;
  name: string;
  slug: string;
  items: GroceryItem[];
}

export type GroupedGroceries = Record<string, GroceryItem[]>;

export interface UserGrocery {
  groceryItemId: string;
}
