import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { AuthorComponent } from "./author/author.component";

export const routes: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full"
	},
	{
		path: "home",
		component: HomeComponent
	},
	{
		path: "authorization",
		component: AuthorizationComponent
	},
	{
		path: "author",
		component: AuthorComponent
	},
]