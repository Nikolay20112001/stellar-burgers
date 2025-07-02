import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredients-slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const current = params.id;
  const allIngredients = useSelector(selectIngredients);
  /** TODO: взять переменную из стора */
  const ingredientData = allIngredients.find(
    (ingredient) => ingredient._id == current
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
