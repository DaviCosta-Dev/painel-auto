Projeto desenvolvido na faculdade: conheça o Painel Auto!

Na disciplina de Desenvolvimento de Aplicativo Mobile, o desafio era criar um app em React Native que resolvesse um problema real. Então desenvolvi o Painel Auto, um aplicativo para quem dirige e quer entender melhor o próprio carro.

O problema que ele resolve: muita gente só descobre que o carro precisava de atenção quando uma luz acende no painel ou quando o conserto já ficou caro. A ideia foi deixar essas informações simples e acessíveis.

O que o app faz:
Catálogo de carros com busca e filtro por categoria (hatch, sedã, SUV e elétricos)
Checklist de manutenção com barra de progresso
Guia das luzes do painel, com cores indicando a urgência
Calculadora de consumo (km/l e custo por km)
Comparador etanol x gasolina

Usei IA como apoio durante o desenvolvimento. Foi uma ótima oportunidade de praticar React Native, organização de interface e experiência do usuário, e de tirar do papel uma ideia que pode evoluir.

Próximos passos: salvar o histórico de manutenção no celular e adicionar fotos dos modelos.

Version in english

Painel Auto

A mobile app for drivers who want to understand their cars. Built with React Native and Expo as a university project for the Mobile Application Development course.

Many people only find out their car needed attention when a warning light turns on or when the repair has already become expensive. Painel Auto puts simple, useful car information in one place.

FEATURES

Car catalog: browse popular models with search by name and filters by category (hatchback, sedan, SUV and electric), plus a details screen for each car.
Maintenance checklist: track routine maintenance items with a progress bar.
Dashboard warning lights: a guide to what each light means, color-coded by urgency (red, yellow and green).
Fuel calculators: average consumption (km/l), cost per km and an ethanol vs. gasoline comparison based on the 70% rule.

TECH STACK

React Native
Expo
JavaScript

CODE HIGHLIGHTS

Each screen is a separate component, with small reusable components.
useState manages search, filters, checklist and navigation, and useMemo computes the daily tip.
FlatList renders the catalog, and a Modal shows car details.
Data (cars, maintenance items, warning lights) is kept apart from the UI, so it can be replaced by an API later.
A centralized color palette and StyleSheet keep the visual style consistent.
