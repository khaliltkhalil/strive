# Strive

A platform to track and analyse your workouts.

Strive allows you to keep records of all your workouts routines.

## Live Demo:

https://extraordinary-brioche-d1bce5.netlify.app/

## Installation

Fork and clone the reposotiray to your local machine.

Install dependencies :

```bash
npm install
```

Fork, clone and run the app api:

https://github.com/khaliltkhalil/strive-api

Make sure the api is running on port 3000.

Add .env.development file in the root directory.

Add the below variable to .env.development

```
REACT_APP_API_URL=http://localhost:3000
```

Start the server :

```bash
npm start
```

## Usage

On the home page you will find a summury of all your workouts by year.

On the workouts page you can view all of your workouts.

To add a workout for today's date, click the add button in the nav bar.

To add an exercise, type the exercise name and click add exercise.

To edit an exercise, click the edit button on the exercise card then add, update or delete sets.

On the profile page you can view and update your info.

![](https://github.com/khaliltkhalil/strive/blob/main/Strive-demo.gif)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
