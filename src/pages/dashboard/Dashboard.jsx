
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import CanvasJSReact from '@canvasjs/react-charts';
import { getProducersCultureService, getProducersAgriVegService,getProducersStatesService } from "../../services/producer";

import './Dashboard.scss';

export const Dashboard = () => {
    const producers = useSelector((state) => state.producer.producers);

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [culturesCount, setCulturesCount] = useState({})
    const [agriVegCount, setAgriVegCount] = useState({})
    const [farmhectares, setFarmhectares] = useState(0)
    const [stateData, setStateData] = useState([])
    

    useEffect(() => {
        setFarmhectares(0)
        getProducersCultureService()
            .then((res) => {
                setCulturesCount(res.data);
            })
            .catch((error) => {
                console.error(error);
                return
            });
        getProducersAgriVegService()
            .then((res) => {
                console.log(res.data);
                setAgriVegCount(res.data);
            })
            .catch((error) => {
                console.error(error);
                return
            });
        getProducersStatesService()
            .then((res) => {
                
                setStateData(res.data);
            })
            .catch((error) => {
                console.error(error);
                return
            });
        for (const p in producers) {
            let totalHectares = Number(producers[p].totalHectares)
            if(!!totalHectares){
                setFarmhectares(farmhectare => farmhectare + totalHectares)
            }

           
        }
    }, [producers])

    const optionsCulture = {
        animationEnabled: true,
        theme: "dark2", // "light1", "dark1", "dark2"
        title: {
            text: "Culturas plantadas"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}",
            startAngle: -90,
            dataPoints: [
                { y: culturesCount.soja, label: "Soja" },
                { y: culturesCount.cafe, label: "Cafe" },
                { y: culturesCount.milho, label: "Milho" },
                { y: culturesCount.algodao, label: "Algodão" },
                { y: culturesCount.cana, label: "Cana de Açucar" },
            ]
        }]
    }
    const optionsAgriVeg = {
        animationEnabled: true,
        theme: "dark2", // "light1", "dark1", "dark2"
        title: {
            text: "Área de agricultável e vegetação"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y} ha",
            startAngle: -90,
            dataPoints: [
                { y: agriVegCount.agricultavel, label: "Agricultável" },
                { y: agriVegCount.vegetacao, label: "Vegetação" },

            ]
        }]
    }

    const optionsState = {
        animationEnabled: true,
        theme: "dark2", // "light1", "dark1", "dark2"
        title: {
            text: "Quantidade por estado"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}",
            startAngle: -90,
            dataPoints: stateData
        }]
    }
    return (
        <section className='dashboard'>
            <section className='top-dashboard'>
                <div className='top-dashboard__chart'>
                    <h2>Total de fazendas</h2>
                    <p>{producers.length}</p>
                </div>
                <div className='top-dashboard__chart'>
                    <h2>Total de cultura</h2>
                    <p>{culturesCount.total}</p>
                </div>
                <div className='top-dashboard__chart'>
                    <h2>Área total das fazendas</h2>
                    <p>{farmhectares} ha</p>
                </div>
            </section>
            <section className='mid-dashboard'>
                <CanvasJSChart className="chart-three" width="30" options={optionsCulture} />
                <CanvasJSChart className="chart-three" options={optionsAgriVeg} />
                <CanvasJSChart className="chart-three" options={optionsState} />
            </section>
        </section>
    );
}