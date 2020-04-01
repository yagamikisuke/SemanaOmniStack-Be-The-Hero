import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigationToDetail(incident) {
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents() {

        if(loading) return; // inpede que o usuário fique fazendo diversas requisiões enquanto a página ainda está carreando

        if(total > 0 && incidents.length == total) return; //Se o número de casos carregados já é o total, então não precisa mais ser carregado e executar o carregarmento contínuo

        const response = await api.get('incidents', {
            params: { page }
        });

        setLoading(true);
        setTotal(response.headers['x-total-count']);
        setIncidents([...incidents, ...response.data]);
        setPage(page+1);
        setLoading(false);
    }
    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} //Função disparada de forma automática quando o usuário chega no final da lista
                onEndReachedThreshold={0.1} //Aceita um valor entre 0 e 1, que indica em quantos por cento o usuário deve chegar em relação ao final da lista para começar a carregar novos itens, onde 0 é 0% e 1 é 100%, logo 0.1 seria 10%.
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail(incident)}>
                            <Text style={styles.detailsButtontexto}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={18} color="#e08041" />
                        </TouchableOpacity>
                    </View>
                )} />
        </View>
    );
}