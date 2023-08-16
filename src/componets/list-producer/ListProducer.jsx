import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { IconContext } from "react-icons";
import { FaTrash } from "react-icons/fa";
import { MultiSelect } from "react-multi-select-component";
import { editProducer,removeProducer, getProducer } from "../../features/producer/producerSlice";
import { getProducersService,updateProducerService, deleteProducerService } from "../../services/producer";
import './ListProducer.scss'



export const ListProducer = () => {
    const producers = useSelector((state) => state.producer.producers);
    const dispatch = useDispatch();
    const [producerEdited, setProducerEdited] = useState({})
    const [selectedCulture, setSelectedCulture] = useState([]);
    
    const optionsMultiSelect = [
        { label: "Soja", value: "soja" },
        { label: "Milho", value: "milho" },
        { label: "Algodão", value: "algodao" },
        { label: "Café", value: "cafe" },
        { label: "Cana de Açucar", value: "cana" },
      ];

    useEffect(() => {
        
        getProducersService()
        .then( (res) => {     
            dispatch(getProducer(res.data));
          })
          .catch( (error) => {
            console.error(error);
            return
          });  


    },[dispatch])
    
    const handleEditProducer = (event, producer) => {
        const newCulture = []
        for (const s in selectedCulture) {
            newCulture.push(selectedCulture[s].value)
        }
        console.log(newCulture);
        if (!!producerEdited.name || producer.name) {
            
            dispatch(editProducer({ ...producer, ...producerEdited,cpf: producer.cpf, open: false, culture:  newCulture }));
            updateProducerService({ ...producer, ...producerEdited,cpf: producer.cpf, open: false, culture: newCulture })
            .then( (res) => {
              })
              .catch( (error) => {
                console.error(error);
                return
              }); 
        } else {
            console.log('o cadastro deve ter o nomee');
        }
    }
    const handleOpen = (event,producer) => {
        if (event.target === event.currentTarget) {
            dispatch(editProducer({ cpf: producer.cpf,open:  !producer.open}));
            const newArray = [];

            for (const c in producer.culture) {
                newArray.push({label: producer.culture[c],value: producer.culture[c]})
            }
            setSelectedCulture(newArray)
        }

    }
    const handleDelete = (event,cpf) => {
        if(window.confirm('tem certeza que deseja deletar este item?')){
            
            dispatch(removeProducer(cpf));
            deleteProducerService(cpf)
        }
    }
    return (
        <div className='list-producer'>
            {producers.length > 0 &&
                producers.map((producer, i) => {
                    return (
                        <div key={producer.cpf} className={producer.open ? 'list-producer__wrap open' : 'list-producer__wrap'} onClick={event => handleOpen(event,producer)}>
                            <p className='list-producer__name' onClick={event => handleOpen(event,producer)}> {producer.name}</p>
                            <p className='list-producer__cpf' onClick={event => handleOpen(event,producer)}>{producer.cpf}</p>
                            <IconContext.Provider value={{ color: "white", className: "list-producer__icon-trash" }} >
                                <FaTrash onClick={event => handleDelete(event,producer)}/>
                            </IconContext.Provider>

                            <div className='list-producer__wrap-edit'>
                                <input type="text" placeholder='Nome' defaultValue={producer.name} onChange={(event) => setProducerEdited({ ...producerEdited, ...{ name: event.target.value } })} />
                                <input type="text" placeholder='Nome da Fazenda' defaultValue={producer.farmName} onChange={(event) => setProducerEdited({ ...producerEdited, ...{ farmName: event.target.value } })} />
                                <input type="text" placeholder='Cidade' defaultValue={producer.city} onChange={(event) => setProducerEdited({ ...producerEdited, ...{ city: event.target.value } })} />
                                <input type="text" placeholder='Estado' defaultValue={producer.state} onChange={(event) => setProducerEdited({ ...producerEdited, ...{ state: event.target.value } })} />
                            
                                <MultiSelect
                                    className="mult-select"
                                    options={optionsMultiSelect}
                                    value={selectedCulture}
                                    onChange={setSelectedCulture}
                                    labelledBy="Select"
                                    hasSelectAll={false}
                                    disableSearch={true}
                                    
                                />
                                <input type="text" placeholder='Área total em hectares' defaultValue={producer.totalHectares} onChange={(event) => setProducerEdited({ ...producerEdited, ...{ totalHectares: event.target.value } })} />
                                <input type="text" placeholder='Área agricultavel em hectares' defaultValue={producer.totalAgriHectares} onChange={(event) => setProducerEdited({ ...producerEdited, ...{ totalAgriHectares: event.target.value } })} />
                                <input type="text" placeholder='Área de vegetação em hectares' defaultValue={producer.totalVegHectares} onChange={(event) => setProducerEdited({ ...producerEdited, ...{ totalVegHectares: event.target.value } })} />
                             
                                <div className="break"></div>
                                <button className="section__button" type="button" onClick={event => handleEditProducer(event, producer)}>Salvar</button>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    );
}