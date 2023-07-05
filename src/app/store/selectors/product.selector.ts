import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getAllProducts = (state: AppState) => state.mainProducts;

const filterProductByTitle = (products: any[], searchText: string) => {
  const textSearch = searchText.toLocaleLowerCase();
  return products.filter((a) =>
    a.title.toLocaleLowerCase().includes(textSearch)
  );
};

export const getAllProductsSearchByTitle = (searchText: string) =>
  createSelector(getAllProducts, (items) => {
    return filterProductByTitle(items, searchText);
  });

export const getAllProductsByCategories = (categories: string[]) =>
  createSelector(getAllProducts, (items) => {
    return items.filter((a) =>
      categories.includes(a.category.toLocaleLowerCase())
    );
  });

export const getAllProductsByCategoriesAndTitle = (
  categories: string[],
  titleSearch: string
) =>
  createSelector(getAllProductsByCategories(categories), (items) => {
    if (titleSearch) {
      return filterProductByTitle(items, titleSearch);
    }
    return items;
  });

export const getItemProductById = (id: number) =>
  createSelector(getAllProducts, (items) => {
    return items.filter((a) => a.id === id)[0];
  });

/* 
 
export const getAllCategoriesByProducts = createSelector(
  getAllProducts,
  (items) => {
    const allCategoriresName = items.map((a) => a.category);
    const uniqueCategories = allCategoriresName.reduce(
      (unique: string[], item) =>
        unique.includes(item) ? unique : [...unique, item],
      []
    );
    const sortCategorires = uniqueCategories.sort((a, b) => a.localeCompare(b));

    return sortCategorires;
  }
);

*/
