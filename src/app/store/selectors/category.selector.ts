import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { capitalizeWords } from 'src/app/utils/bankInc.util';

export const getAllProducts = (state: AppState) => state.mainProducts;

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
      
      const categories = sortCategorires.map((a) => ({
        id: a.toLocaleLowerCase(),
        value: capitalizeWords(a),
      }));

    return categories;
  }
);
