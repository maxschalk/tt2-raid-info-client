# TT2 Raid Data Client

## Context

This repo is part of a bigger project concerning weekly raid data of GameHive's popular mobile game [Tap Titans 2](https://www.gamehive.com/games/tap-titans-2).

The weekly raid data for clans used to only be available on [GameHive's Discord Server](https://discord.gg/gamehive) in raw JSON format. The overarching project is an effort to make this data more accesible to players both programmatically (via API) or visually (via this web app).

## Description

This web app provides a visual way to access and explore raid seed data.

It receives data by the [TT2 Raid Info API](https://github.com/riskypenguin/tt2-raid-info-api).

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/riskypenguin/tt2-raid-info-client.git tt2-raid-info-client
    ```

2. Install requirements

    ```bash
    npm install
    ```

## Usage

You can run the project locally via `npm run dev`.

It tries to get `STAGE` and `API_STAGE` (development / production) variables from the environment. Production is assumed as a default for both.

This allows you to point the client to another version of the API (e.g. a locally hosted one) if necessary. By default, data is fetched from the production version of the TT2 Raid Info API, hosted by me.

## Project status & Roadmap

The client is feature-complete for now.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
