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

    <h1>Sobre nuestro proyecto - Videos</h1>

    <Container>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>anxiety_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Video Explicativo sobre anxiety_stats</CardText
                    >
                    <a href="/#/integrations/anxiety_1">
                        <Button type="button" class="btn btn-info"
                            >Video Anxiety</Button
                        ></a
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
                        >Video Explicativo sobre depression_stats</CardText
                    >
                    <a href="/#/analytics/depression_stats_graph">
                        <Button type="button" class="btn btn-info"
                            >Video Depression</Button
                        ></a
                    >
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
                        >Video Explicativo sobre stress_stats</CardText
                    >
                    <a href="/#/integrations/Covid">
                        <Button color="primary">Video Stress</Button>
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
                        Video Explicativo sobre smoking_stats
                    </CardText>

                    <a href="/#/integrations/Sport"
                        ><Button color="primary">Video Smoking</Button></a
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
