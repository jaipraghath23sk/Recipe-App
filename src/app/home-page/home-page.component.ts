import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RecipeService } from '../recipe.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})

export class HomePageComponent implements OnInit {
  showRecipes: boolean = false;
  recipeItems: any[] = [];
  filteredRecipes: any[] = []; 
  searchTerm: string = ''; 
  filteredItems: any[] = [];
  selectedRecipe: any = null;
  item: any;
  selectedMealType: string = '';
  selectedDietaryRestriction: string = '';
  selectedDietLabels: String = '';
  favoriteRecipes: any[] = [];

  constructor(
    private recipeservice: RecipeService,
    private matdialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recipeservice.getRecipeItems().subscribe((data) => {
      this.recipeItems = data.hits;
      console.log(this.recipeItems);
      this.recipeItems = this.recipeItems.map((item) => ({
        ...item,
        recipe: {
          ...item.recipe,
          isFavorite: false, 
        },
      }));
      this.filteredRecipes = [...this.recipeItems];
      console.log(this.filteredRecipes);
    });
  }

  filterRecipes(term: string = '') {
    if (!term) {
      // If no search term, reset to all recipes
      this.filteredRecipes = [...this.recipeItems];
    } else {
      // Convert search term to lowercase for case-insensitive matching
      const searchTerm = term.toLowerCase();

      // Filter recipes based on multiple fields
      this.filteredRecipes = this.recipeItems.filter((item) => {
        const recipe = item.recipe;

        // Check each criterion
        return (
          recipe &&
          ((recipe.label && recipe.label.toLowerCase().includes(searchTerm)) || // Filter by label
            (recipe.cuisineType &&
              recipe.cuisineType.some((ct: string) =>
                ct.toLowerCase().includes(searchTerm)
              )) || // Filter by cuisine type
            (recipe.mealType &&
              recipe.mealType.some((mt: string) =>
                mt.toLowerCase().includes(searchTerm)
              )) || // Filter by meal type
            (recipe.dietLabels &&
              recipe.dietLabels.some((dl: string) =>
                dl.toLowerCase().includes(searchTerm)
              )) || // Filter by diet labels
            (recipe.dishType &&
              recipe.dishType.some((dt: string) =>
                dt.toLowerCase().includes(searchTerm)
              )) || // Filter by dish type
            (recipe.healthLabels &&
              recipe.healthLabels.some((hl: string) =>
                hl.toLowerCase().includes(searchTerm)
              ))) // Filter by health labels
        );
      });

      
    }
  }

  mealType(meals: string) {
    const meal = meals.toLocaleLowerCase();

    this.filteredRecipes = this.recipeItems.filter((item) => {
      const recipe = item.recipe;
      return (
        recipe &&
        recipe.mealType &&
        recipe.mealType.some((mt: string) => mt.toLowerCase().includes(meal))
      );
    });
  }

  dietRestriction(type: string) {
    const dietType = type.toLocaleLowerCase();

    this.filteredRecipes = this.recipeItems.filter((item) => {
      const recipe = item.recipe;
      return (
        recipe.healthLabels &&
        recipe.healthLabels.some((hl: string) =>
          hl.toLowerCase().includes(dietType)
        )
      );
    });
  }

  dietlabel(diet: any) {
    const dietLable = diet.toLocaleLowerCase();

    this.filteredRecipes = this.recipeItems.filter((item) => {
      const recipe = item.recipe;
      return (
        recipe.dietLabels &&
        recipe.dietLabels.some((dl: string) =>
          dl.toLowerCase().includes(dietLable)
        )
      );
    });
  }

  openRecipeDetails(recipe: any) {
    this.selectedRecipe = recipe; // Set selected recipe for the dialog
  }

  toggleFavorite(recipe: any) {
    recipe.isFavorite = !recipe.isFavorite; // Toggle the isFavorite status

    if (recipe.isFavorite) {
      console.log(`${recipe.label} is now a favorite.`);
    } else {
      console.log(`${recipe.label} is no longer a favorite.`);
    }
  }
  showFavorites() {
    this.filteredRecipes = this.recipeItems.filter(
      (item) => item.recipe.isFavorite
    );
    this.showRecipes = true;
  }
  showAllRecipes() {
    this.filteredRecipes = [...this.recipeItems];
    this.showRecipes = !true;
  }
}
