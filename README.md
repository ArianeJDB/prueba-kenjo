# PruebaKenjo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
 
______________
El proxy y el servicio para la petición de un album por el id (getAlbumById) está implementada, pero no se usa en el código, ya que para no hacer más peticiones al servidor, se han guardado todos los albums en el LocalStorage y poder acceder a ellos sin necesidad de hacer una petición al servidor. Por cuestiones de tiempo no pude implementar un store, por eso usé el LocalStorage

La maqueta está hecha desktop first ya que por cuestiones de tiempo no me daba tiempo de hacerlo responsive, por lo que escogí maqueta solo a resolución de desktop