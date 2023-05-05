#welbex_backend

##Команды
Для запуска проекта необходимо выполнить следующие команды:

**npm start**
Запускает приложение в режиме разработки.
Откройте http://localhost:8000, чтобы просмотреть его в браузере.

**npm run typeorm**
Запускает TypeORM CLI для работы с базой данных.

**npm run migration:up**
Выполняет миграцию базы данных (накатывает новую миграцию).

**npm run migration:down**
Откатывает последнюю миграцию базы данных.

**npm run db:seed**
Заполняет базу данных стартовыми записями.

##Swagger
Документация API доступна по адресу http://localhost:8000/api-docs. Она была сгенерирована с помощью Swagger UI. Для ее построения использовался YAML-файл, который описывает API.