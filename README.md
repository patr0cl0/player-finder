# Player finder

Is a simple app that fetch players from a API, stores it in a redux state and you can filter
players by some fields.

**How to run it?**

``` yarn; yarn start ```

**How to use docker?**

Easy, ``docker build -t CONTAINER_NAME``

and then: ``docker run -p 3000:3000 CONTAINER_NAME``

**Considerations**
- I would really like to use react hooks but testing libraries are not well supported yet for then.
- I would've like to use [create-nano-creat-app](https://github.com/adrianmcli/nano-react-app), it's a minimalistic version of ``create-react-app`` with much less boilerplate and configs
- For the redux scaffolding folder tree is ase the [ducky modular redux proposal](https://github.com/erikras/ducks-modular-redux), it saves a lot of boilerplate.
- Couldn't test ``formik`` component really well, Don't know what happen there.
- I would've like to use ``typescript`` on the project, It really scalable, it saves a lot of time in future and is awesome.

**Contributors**
- [Fernando Salazar](https://github.com/fernandwtf)