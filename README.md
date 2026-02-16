


### GENERAL WORKFLOW:

- Initialize our Laravel backend
- Initialize our Angular frontend
- Create MySQL database (we're using WAMP)
- Create columns for projects, tasks, and project_user (users should be created by default)
- Create API routes and corresponding controllers (Read only controller?) in Laravel for users, user projects, projects, and project tasks (lets first create a "ping" route to test our setup)
- Lets add in our data, Laraval Docs mentioned "seeder" classes (artisan make:seeder, keep order in mind for foreign keys)
- Test API routes again after seeding data
- Establish proxy.config.json to tell Angular where to get our data from (don't forget to tell angular.json about it)
- Setup our Angular frontend to retrieve the data from our API by creating a new service
- Pull data and build tables for our "dashbaord" component
- Display dashboard with our html template
- Once we confirm we are properly grabbing and showing data lets move on to showing the tables explicitely asked for (User's Project List and Project Task List)
- Consider using view states (ViewMode) instead of writing two new routes for our lists
- Check the proper data is displaying
- add some css just so its not too boring

### DATABASE SUDO SCHEMA:
- users -> projects needs to be many to many
- task belongs to one project (although this only fits this specific use case. could easily make a task fit mult. projects)
- task belongs to one user ("")
- estimated hours belongs to a task (project hours can be calculated from the task hours)

### NOTES & THOUGHTS:
- While populating the seeder files (specifically the ProjectUserSeeder), I'm realizing there are a couple options for how i could have designed this database to properly display the data. I've decided to go ahead with my membership table, even though I just realized all of the Tasks will also include ownership information, which could then be filtered to populate the "Members" field for each project. It could be argued that my method is redunant, but I'll simply argue that it's more sound proof, and possibly more scalable.
- Although mysql will auto generate id values, lets hard code the ones that need gauranteed reference matches (users and projects)
- Seeding relational data gave me brain damage, would have probably preferred just making POST routes and adding the data in via UI :')
- Wondering if making this board route was a good idea or if we should have just made multiple calls to get the data for our custom index
- Having data rendering persistance issues. Data doesn't want to stay displayed after refreshing. Turns out this is related to my initial Angular setup prompt when it asked me to setup "zoneless", we should have done that it appears.
- Using view states to change to different tables is way better than creating new routes for different table displays. We have all the code ALREADY to show those initial tables in our app.ts, so we can just reuse and adjust

### INFO:
Laravel backend running on http://localhost:8000
Angular frontend running on http://localhost:4200/