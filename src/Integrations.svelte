<script>
    import {
        Button,
        Card,
        CardBody,
        CardFooter,
        CardHeader,
        CardSubtitle,
        CardText,
        CardTitle,
        Col,
        Container,
        Nav,
        NavItem,
        NavLink,
        Row,
    } from "sveltestrap";
</script>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/">Volver a la página principal</NavLink>
        </NavItem>

        <NavItem>
                <NavLink href="/">Info</NavLink>
        </NavItem>

        <NavItem>
                <NavLink href="/">Analíticas</NavLink>
        </NavItem>

        <NavItem>
                <NavLink href="/">Integraciones</NavLink>
        </NavItem>

        <NavItem>
            <NavLink href="/">Vídeos</NavLink>
    </NavItem>
    </Nav>

    <h1>Integraciones</h1>

    <Container>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>anxiety_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Estadísticas acerca de los datos recogidos por ansiedad
                        en las comunidades autónomas de España.</CardText
                    >
                    <a
                        href="https://sos2021-11.herokuapp.com/api/v2/anxiety_stats"
                    >
                        <Button color="primary">API (v2)</Button></a
                    >
                    <a href="/#/anxiety_stats">
                        <Button color="primary">Interfaz de Ansiedad</Button>
                    </a>
                    <a
                        href="https://documenter.getpostman.com/view/14948159/TzRXA6TK"
                        ><Button color="info">Documentación v2</Button></a
                    >
                </CardBody>
                <CardFooter
                    >realizado por
                    <a href="https://github.com/EsDeSepa"
                        >Jose Pablo Carrasco Cobos</a
                    ></CardFooter
                >
            </Card>
        </Col>

        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>depression_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Estadísticas acerca de los datos recogidos por depresion
                        en las comunidades autónomas de España.</CardText
                    >
                    <a
                        href="https://sos2021-11.herokuapp.com/api/v2/depression_stats"
                    >
                        <Button color="primary">API (v2)</Button></a
                    >
                    <a href="/#/depression_stats">
                        <Button color="primary">Interfaz de Depresion</Button>
                    </a>
                    <a
                        href="https://documenter.getpostman.com/view/14948118/TzJu8ccc"
                        ><Button color="info">Documentación v1</Button></a
                    > <a
                    href="https://documenter.getpostman.com/view/14948118/TzRXAS6B"
                    ><Button color="info">Documentación v2</Button></a
                >
                </CardBody>
                <CardFooter
                    >realizado por
                    <a href="https://github.com/jdblanco"
                        >Juan Diez Blanco</a
                    ></CardFooter
                >
            </Card>
        </Col>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>stress_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Estadísticas acerca de los datos recogidos por estrés
                        en las comunidades autónomas de España.</CardText
                    >
                    <a
                        href="/#/integrations/Covid"
                    >
                        <Button color="primary">COVID-19</Button>
                    </a>
                    <a href="/#/integrations/Coches">
                        <Button color="primary">Coches</Button>
                    </a>
                    <a
                        href="https://documenter.getpostman.com/view/14948110/TzXunKiV"
                    >
                        <Button color="info">Documentación v2</Button>
                    </a>
                </CardBody>
                <CardFooter
                    >desarrollado por
                    <a href="https://github.com/anaromero99">Ana Romero Cáceres</a
                    >
                </CardFooter>
            </Card>
        </Col>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>smoking_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText>
                        Estadísticas acerca de los datos recogidos por tabaquismo
                        en los países Europeos.
                    </CardText>
                    
                    <a href="/#/integrations/Sport"
                        ><Button color="primary">Sports</Button></a
                    >
                    <a href="/#/integrations/Enfermo"
                        ><Button color="primary">Enfermo</Button></a
                    >
                    <a
                        href="https://documenter.getpostman.com/view/14948136/TzJsgdzX"
                        ><Button color="info">Documentación v1</Button></a
                    >
                    <a
                    href="https://documenter.getpostman.com/view/14948136/TzXunKiP"
                    ><Button color="info">Documentación v2</Button></a
                >

                </CardBody>
                <CardFooter
                    >desarrollado por
                    <a href="https://github.com/Mirishya"
                        >Miriam Campano Crespo</a
                    ></CardFooter
                >
            </Card>
        </Col>
    </Container>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    h1 {
        color: #0d497e;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
