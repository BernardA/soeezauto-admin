/* eslint-disable react/display-name */
import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Card,
    CardContent,
    FormControl,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    List,
    ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Check, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { apiQl } from 'lib/functions';
import Link from 'components/std/link';
import Breadcrumb from 'components/std/breadcrumb';
import { showtime } from 'tools/functions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    barRoot: {
        backgroundColor: 'initial',
        color: 'initial',
        '& .MuiToolbar-root': {
            justifyContent: 'space-between',
        },
    },
    cardContent: {
        '& div': {
            marginBottom: 15,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

const VersionView = (props) => {
    const { version } = props;
    const classes = useStyles();
    return (
        <div>
            <Breadcrumb
                links={[
                    {
                        href: '/versions',
                        text: 'versions',
                    },
                    {
                        href: null,
                        text: 'version view',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <p>{version.version}</p>
                    <Link href={`/versions/edit/${version._id}`}>
                        <Button color="inherit">Edit</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <div>
                            <FormControl>
                                <Typography component="span">Id</Typography>
                                <Typography variant="body2">{version.id}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Model</Typography>
                                <Typography variant="body2">
                                    {version.model.model}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Active</Typography>
                                <Typography variant="body2">
                                    {version.isActive ? <Check /> : <Close />}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Gear box</Typography>
                                <Typography variant="body2">{version.gearbox}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Places</Typography>
                                <Typography variant="body2">{version.places}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Doors</Typography>
                                <Typography variant="body2">{version.doors}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Curb weight</Typography>
                                <Typography variant="body2">
                                    {version.curbWeight}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Gvw</Typography>
                                <Typography variant="body2">{version.gvw}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Traction</Typography>
                                <Typography variant="body2">
                                    {version.traction}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Tyre front</Typography>
                                <Typography variant="body2">
                                    {version.tyreFront.tyre}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Tyre back</Typography>
                                <Typography variant="body2">
                                    {version?.tyreBack?.tyre || '-'}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Engine</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Power</TableCell>
                                            <TableCell>Fuel</TableCell>
                                            <TableCell>CC</TableCell>
                                            <TableCell>Cylinder</TableCell>
                                            <TableCell>Torque</TableCell>
                                            <TableCell>Valves</TableCell>
                                            <TableCell>Aspiration</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{version.motor.id}</TableCell>
                                            <TableCell>{version.motor.power}</TableCell>
                                            <TableCell>{version.motor.fuel}</TableCell>
                                            <TableCell>
                                                {version.motor.cc || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {version.motor.cylinder || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {version.motor.torque || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {version.motor.valves || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {version.motor.aspiration || '-'}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Measures</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Fuel tank</TableCell>
                                            <TableCell>Width</TableCell>
                                            <TableCell>Height</TableCell>
                                            <TableCell>Length</TableCell>
                                            <TableCell>Wheelbase</TableCell>
                                            <TableCell>Trunk</TableCell>
                                            <TableCell>Trunk max</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{version.measures.id}</TableCell>
                                            <TableCell>
                                                {version.measures?.fuelTank || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {version.measures.width}
                                            </TableCell>
                                            <TableCell>
                                                {version.measures.height}
                                            </TableCell>
                                            <TableCell>
                                                {version.measures.length}
                                            </TableCell>
                                            <TableCell>
                                                {version.measures.wheelbase}
                                            </TableCell>
                                            <TableCell>
                                                {version.measures.trunk}
                                            </TableCell>
                                            <TableCell>
                                                {version.measures.trunkMax}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Performance</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>To 100</TableCell>
                                            <TableCell>Max speed</TableCell>
                                            <TableCell>Emissions</TableCell>
                                            <TableCell>Mileage city</TableCell>
                                            <TableCell>Mileage road</TableCell>
                                            <TableCell>Mileage mix</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                {version.performance.id}
                                            </TableCell>
                                            <TableCell>
                                                {version.performance?.to100 || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {version.performance?.maxSpeed || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {version.performance?.emissions || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {version.performance?.mileageCity || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {version.performance?.mileageRoad || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {version.performance?.mileageMix || '-'}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">CF</Typography>
                                <Typography variant="body2">{version.CF.CF}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Prices</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Promo</TableCell>
                                            <TableCell>Updated at</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {version.prices.edges.map((price) => (
                                            <TableRow key={price.node.id}>
                                                <TableCell>{price.node.id}</TableCell>
                                                <TableCell>{price.node.price}</TableCell>
                                                <TableCell>{price.node.promo}</TableCell>
                                                <TableCell>
                                                    {showtime(price.node.updatedAt)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <List>
                                    {version.trims.map((trim) => (
                                        <ListItem key={trim.id}>{trim.trim}</ListItem>
                                    ))}
                                </List>
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

VersionView.propTypes = {
    version: PropTypes.object.isRequired,
};

export default VersionView;

const queryQl = `query getVersion(
  	    $id: ID!
    ){
    version(id: $id){
        id
        _id
        version
        isActive
        model {
            id
            model
        }
        gearbox
        places
        doors
        curbWeight
        gvw
        traction
        tyreFront {
            tyre
        }
        tyreBack {
            tyre
        }
        prices(
            first: 100
            after: null
            _order: {updatedAt: "DESC"}
        ) {
            edges {
                node {
                    id
                    updatedAt
                    price
                    promo
                    isActive
                }
            }
        }
        CF {
            CF
        }
        motor {
            id
            power
            fuel
            cc
            cylinder
            torque
            valves
            aspiration
        }
        measures {
            id
            fuelTank
            width
            height
            length
            wheelbase
            trunk
            trunkMax
        }
        performance {
            id
            to100
            maxSpeed
            emissions
            mileageCity
            mileageRoad
            mileageMix
        }
        trims(_order: { trim: "ASC"}) {
            id
            trim
            trimType
        }
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/versions/${context.params.versionId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            version: data.data.version,
        },
    };
}
