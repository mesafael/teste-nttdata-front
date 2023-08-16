
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import { cpf,cnpj } from 'cpf-cnpj-validator';
import { addProducer } from "../../features/producer/producerSlice";
import { ListProducer } from "../../componets/list-producer/ListProducer";
import { addProducerService } from "../../services/producer";

import './Produtor.scss';

export const Produtor = () => {
    const [cpfCnpj, setcpfCnpj] = useState('');
    const [mask, setMask] = useState('');
    const [err, setErr] = useState("")
    const dispatch = useDispatch();

    const handleChangeInput = (event, type) => {
        console.log(mask);
        setErr("")
        setcpfCnpj(event.target.value);
        setMask(type === "cpfCnpj");
    }
    const handleAddProducer = event => {
        if (event.key === 'Enter' || event.type === 'click') {//verifica se o evento e click e keypress enter
            
            if (cpf.isValid(cpfCnpj) || cnpj.isValid(cpfCnpj)) {
                addProducerService({ cpf: cpfCnpj, open: true, culture: [] })
                    .then((res) => {
                        dispatch(addProducer({ cpf: cpfCnpj, open: true, culture: [] }));
                    })
                    .catch((error) => {
                        setErr('cpf ou cnpj não é valido')
                        console.log(error.response.data.msg);
                        return
                    });
            } else {
                setErr('cpfCnpj não é valido')
                console.log('cpfCnpj não é valido');
            }
        }
    };

    return (
        <section className="section">
            <div className="section__wrap-input">
                {err &&
                    <p className='section__error-input'>{err}</p>
                }
                <CpfCnpj
                    placeholder="Adicione CPF ou CNPJ"
                    className="section__input"
                    value={cpfCnpj}
                    onChange={handleChangeInput}
                    onKeyPress={handleAddProducer}
                />

                <button className="section__button" type="button" onClick={handleAddProducer}>Adicionar</button>
            </div>
            <ListProducer />
        </section>
    );
}