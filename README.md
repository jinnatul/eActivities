# eActivities


## Branch: API 
### Create project solution File (eActivities.sln)
- dotnet new sln

### Create sub-project's 
- dotnet new classlib -n Domain        ***Main ClassLib project
- dotnet new classlib -n Application   ***Business Logic Project
- dotnet new classlib -n Persistence   ***Database Related
- dotnet new webapi -n API             ***API Related

### Create sln for all Sub-project's
- dotnet sln add Domain/
- dotnet sln add Application/
- dotnet sln add Persistence/
- dotnet sln add API/

Project(s)
----------
- Domain/Domain.csproj
- Application/Application.csproj
- Persistence/Persistence.csproj
- API/API.csproj

### Reference between sub-Project's and Main Project
- /eActivities/Application$ dotnet add reference ../Domain/
- /eActivities/Application$ dotnet add reference ../Persistence/
- /eActivities/API$ dotnet add reference ../Application/
- /eActivities/Persistence$ dotnet add reference ../Domain/
![References](https://user-images.githubusercontent.com/31995155/71798572-e8eac780-307c-11ea-869e-1f1007db5184.png)


## Branch: Client
### Create React Client side application
- npx create-react-app client-app --template typescript

### Install Dependency
- npm add semantic-ui-react
- npm i axios


## Branch: Crud_react_core
### Part-1 (API dotnet core)
- Adding activity entity
- Add nugetPack(mediatr.extensions.microsoft.dependencyinjection)
- Create activity API controller
- Adding Details,Create,Edit,Delete Handler
- Dealing with boilerplate code in our Handlers

![1](https://user-images.githubusercontent.com/31995155/72104264-40c35000-3355-11ea-8503-dbc44731139a.png)
![2](https://user-images.githubusercontent.com/31995155/72104267-415be680-3355-11ea-914f-5e0a8d590db2.png)
![3](https://user-images.githubusercontent.com/31995155/72104269-428d1380-3355-11ea-8a6d-51867e19ddea.png)

### Part-2 (React)
- Folder structure (React)
- Getting list activities from API
- Adding activity Interface in TS
- Adding Navigation Bar (navbar)
- Styling react components
- Adding activity dashboard
- Creating an activity list
- Adding the activity Details component
- Adding the activity Form component
- Selecting an Individual activity
- Adding Edit Mode
- Handling form Submission
- Adding Create activity
- Adding Delete functionality

  ### Install Dependency
   - npm install uuid
   - npm install @types/uuid
   
   
## Branch: Reactstructure
- Update API route: Route("api/[controller]")
- Create an agent.ts (Axios support)
- Adding delay our API(activities) method
- Adding Loading component
- Adding loading indicator for submission or delete Data
- Setting Up a Mobx Store (activityStore.ts)
- Adding async and await in our method
- Refactoring activity List
- Refactoring (Create, Delete, Edit) method
- Enabling Mobx strict mode

 ### Install Dependency
  - npm install mobx mobx-react-lite
