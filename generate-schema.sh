#!/bin/sh

if [ -z "$APP_ENV" ]; then
  APP_ENV="development"
fi

source .env.$APP_ENV

if ! command -v gql-sdl &> /dev/null; then
  echo "gql-sdl not found. Installing..."
  pnpm add -g gql-sdl
fi

if [ ! -d "./data" ]; then
  mkdir ./data
fi

gql-sdl $EXPO_PUBLIC_SUPABASE_URL/graphql/v1 -H "apikey: $EXPO_PUBLIC_SUPABASE_ANON_KEY" > ./data/schema.graphql
exit 0