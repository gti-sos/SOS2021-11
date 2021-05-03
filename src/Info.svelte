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
    </Nav>

    <h1>SOS2021-11</h1>

    <h2>Componentes del SOS2O21-11</h2>
    <Container>
        <Col>
            <a href="http://github.com/EsDeSepa">Jose Pablo Carrasco Cobos</a>
        </Col>
        <Col>
            <a href="http://github.com/anaromero99">Ana Romero Caceres</a>
        </Col>
        <Col>
            <a href="http://github.com/jdblanco">Juan Diez Blanco</a>
        </Col>
        <Col>
            <a href="http://github.com/Mirishya">Miriam Campano Crespo</a>
        </Col>
    </Container>
    <p />
    <Container>
        <Row>
            <Col>
                <a href="http://github.com/gti-sos/SOS2021-11">
                    <Button color="primary">GitHub del Grupo</Button></a
                >
            </Col>
        </Row>
    </Container>
    <p />
    <h2>APIs</h2>
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
                        href="https://sos2021-11.herokuapp.com/api/v1/anxiety_stats"
                    >
                        <Button color="primary">API (v1)</Button></a
                    >
                    <a href="/#/anxiety_stats">
                        <Button color="primary">Interfaz de Ansiedad</Button>
                    </a>
                    <a
                        href="https://documenter.getpostman.com/view/14948045/TzJoDg1Q"
                        ><Button color="info">Documentación v1</Button></a
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
                    <CardTitle><h5>anxiety_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Estadísticas acerca de los datos recogidos por ansiedad
                        en las comunidades autónomas de España.</CardText
                    >
                    <a
                        href="https://sos2021-11.herokuapp.com/api/v1/anxiety_stats"
                    >
                        <Button color="primary">API (v1)</Button></a
                    >
                    <a href="/#/anxiety_stats">
                        <Button color="primary">Interfaz de Ansiedad</Button>
                    </a>
                    <a
                        href="https://documenter.getpostman.com/view/14948045/TzJoDg1Q"
                        ><Button color="info">Documentación v1</Button></a
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
                    <CardTitle><h5>life-stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Fuente de datos del índice de calidad de vida por país,
                        que está vinculado a el índice de poder adquisitivo y el
                        índice de seguridad.</CardText
                    >
                    <a
                        href="https://sos2021-01.herokuapp.com/api/v1/life-stats"
                    >
                        <Button color="primary">API v1</Button>
                    </a>
                    <a href="/#/life-stats">
                        <Button color="primary">Interfaz</Button>
                    </a>
                    <a
                        href="https://documenter.getpostman.com/view/14961437/TzJoDg1P"
                    >
                        <Button color="info">Documentación v1</Button>
                    </a>
                </CardBody>
                <CardFooter
                    >desarrollado por
                    <a href="https://github.com/Lucia2712">Lucia Castro Perez</a
                    >
                </CardFooter>
            </Card>
        </Col>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>natality-stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText>
                        Ratios de natalidad y fertlidad de hombres y mujeres
                        nacidos por año y país.
                    </CardText>
                    <a href="/api/v1/natality-stats"
                        ><Button color="primary">API v1</Button></a
                    >
                    <a href="/#/natality-stats"
                        ><Button color="primary">Interfaz</Button></a
                    >
                    <a
                        href="https://documenter.getpostman.com/view/14932491/TzJrCzRM"
                        ><Button color="info">Documentación v1</Button></a
                    >
                </CardBody>
                <CardFooter
                    >desarrollado por
                    <a href="https://github.com/AbramsM1A2"
                        >Abraham Corta Ramírez</a
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
        color: #ff3e00;
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
