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
            <NavLink href="/#/info">Info</NavLink>
        </NavItem>

        <NavItem>
            <NavLink href="/#/analytics">Analíticas</NavLink>
        </NavItem>

        <NavItem>
            <NavLink href="/#/integrations">Integraciones</NavLink>
        </NavItem>

        <NavItem>
            <NavLink href="/#/about">Vídeos</NavLink>
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
                        >Integraciones y Gráficos base de anxiety_stats</CardText
                    >
                    <a href="/#/integrations/anxiety_1">
                        <Button type="button" class="btn btn-info">Anxiety_1</Button></a
                    >
                    <a href="/#/integrations/anxiety_2">
                        <Button type="button" class="btn btn-info">Anxiety_2</Button></a
                    >
                    <a href="/#/integrations/Games">
                        <Button type="button" class="btn btn-warning">Games</Button></a
                    >
                    <a href="/#/integrations/NBA">
                        <Button type="button" class="btn btn-warning">NBA</Button></a
                    >
                    <a href="/#/integrations/India">
                        <Button type="button" class="btn btn-success">India</Button></a
                    >
                    <a href="/#/integrations/Sanity">
                        <Button type="button" class="btn btn-success">Sanity</Button></a
                    >
                    <a href="/#/integrations/illiteracy">
                        <Button type="button" class="btn btn-success">Illiteracy</Button></a
                    >
                    <a href="/#/integrations/Natality">
                        <Button type="button" class="btn btn-success">Natality</Button></a>
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
                        >Integraciones y Gráficos base de depression_svelte</CardText
                    >
                    <a href="/#/analytics/depression_stats_graph">
                        <Button type="button" class="btn btn-info">Depression_1</Button></a
                    >
                    <a href="/#/analytics/depression_stats_chart">
                        <Button type="button" class="btn btn-info">Depression_2</Button></a
                    >
                    <a href="/#/integrations/children_out">
                        <Button type="button" class="btn btn-success">Niños</Button></a
                    >
                    <a href="/#/integrations/suicides">
                        <Button type="button" class="btn btn-success">Suicidios</Button></a
                    >
                    <a href="/#/integrations/obesity">
                        <Button type="button" class="btn btn-success">Obesidad</Button></a
                    >
                    <a href="/#/integrations/futbol">
                        <Button type="button" class="btn btn-warning">Futbol</Button></a
                    >
                    <a href="/#/integrations/bad">
                        <Button type="button" class="btn btn-warning">Breaking bad</Button></a>
                </CardBody>
                <CardFooter
                    >realizado por
                    <a href="https://github.com/jdblanco">Juan Diez Blanco</a
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
                        >Integraciones y Gráficos base de stress_stats</CardText
                    >
                    <a href="/#/integrations/Covid">
                        <Button color="primary">COVID-19</Button>
                    </a>
                    <a href="/#/integrations/Bicicletas">
                        <Button color="primary">Bicicletas</Button>
                    </a>
                    <a href="/#/integrations/Unemployment">
                        <Button color="info">Unemployment</Button>
                    </a>
                    <a href="/#/integrations/Evictions">
                        <Button color="info">Evictions</Button>
                    </a>
                    <a href="/#/integrations/Inversion">
                        <Button color="info">Inversion</Button>
                    </a>
                    <a href="/#/integrations/Education">
                        <Button color="info">Education</Button>
                    </a>
                </CardBody>
                <CardFooter
                    >desarrollado por
                    <a href="https://github.com/anaromero99"
                        >Ana Romero Cáceres</a
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
                        Integraciones y Gráficos base de smoking_stats.
                    </CardText>

                    <a href="/#/integrations/Sport"
                        ><Button color="primary">Sports</Button></a
                    >
                    <a href="/#/integrations/Enfermo"
                        ><Button color="primary">Enfermo</Button></a
                    >
                    <a href="/#/integrations/Life"
                        ><Button color="info">Life</Button></a
                    >
                    <a href="/#/integrations/Grammys"
                        ><Button color="info">Grammys</Button></a
                    >
                    <a href="/#/integrations/Pollution"
                        ><Button color="info">Pollution</Button></a
                    >
                    <a href="/#/integrations/Food"
                        ><Button color="info">Food</Button></a
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
