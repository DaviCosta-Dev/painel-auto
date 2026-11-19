import React, { useMemo, useState } from 'react';
import {
  View, Text, TextInput, ScrollView, FlatList, TouchableOpacity,
  Modal, StyleSheet, StatusBar, Platform, SafeAreaView,
} from 'react-native';
 
const C = {
  asfalto: '#1C1F24',
  grafite: '#2A2E35',
  aco: '#8A939C',
  faixa: '#F2C230',
  papel: '#F4F4F0',
  branco: '#FFFFFF',
  vermelho: '#D8402F',
  verde: '#2E9D5B',
};
 
const CARROS = [
  { id: '1', nome: 'Fiat Mobi', tipo: 'Hatch', motor: '1.0 Flex, ~75 cv', consumo: '~13 km/l', portaMalas: '215 L', obs: 'Compacto e barato de manter, ideal para cidade e primeiro carro.' },
  { id: '2', nome: 'Volkswagen Polo', tipo: 'Hatch', motor: '1.0 TSI Turbo, ~116 cv', consumo: '~12 km/l', portaMalas: '300 L', obs: 'Bom equilíbrio entre conforto, segurança e desempenho.' },
  { id: '3', nome: 'Chevrolet Onix', tipo: 'Hatch', motor: '1.0 Turbo, ~116 cv', consumo: '~12 km/l', portaMalas: '303 L', obs: 'Um dos carros mais vendidos do país, com ampla rede de peças.' },
  { id: '4', nome: 'Hyundai HB20', tipo: 'Hatch', motor: '1.0 Turbo, ~120 cv', consumo: '~12 km/l', portaMalas: '300 L', obs: 'Boa lista de equipamentos e garantia estendida.' },
  { id: '5', nome: 'Honda Civic', tipo: 'Sedã', motor: '2.0 Flex, ~155 cv', consumo: '~11 km/l', portaMalas: '519 L', obs: 'Sedã espaçoso, confortável e com boa revenda.' },
  { id: '6', nome: 'Toyota Corolla Cross', tipo: 'SUV', motor: '2.0 Flex, ~177 cv', consumo: '~11 km/l', portaMalas: '440 L', obs: 'SUV familiar com fama de durabilidade. Também existe versão híbrida.' },
  { id: '7', nome: 'Jeep Renegade', tipo: 'SUV', motor: '1.3 Turbo, ~185 cv', consumo: '~10 km/l', portaMalas: '320 L', obs: 'Visual marcante e boa posição de dirigir.' },
  { id: '8', nome: 'BYD Dolphin Mini', tipo: 'Elétrico', motor: 'Elétrico, ~75 cv', consumo: '~280 km de autonomia', portaMalas: '230 L', obs: 'Sem gasolina, custo por km muito baixo, carrega em tomada ou wallbox.' },
];
const TIPOS = ['Todos', 'Hatch', 'Sedã', 'SUV', 'Elétrico'];
 
const MANUTENCAO = [
  { id: 'm1', titulo: 'Óleo e filtro de óleo', dica: 'Em geral a cada 10.000 km ou 12 meses. Veja o manual.' },
  { id: 'm2', titulo: 'Calibragem dos pneus', dica: 'Confira a cada 15 dias, com pneus frios.' },
  { id: 'm3', titulo: 'Alinhamento e balanceamento', dica: 'Aproximadamente a cada 10.000 km ou ao notar vibração.' },
  { id: 'm4', titulo: 'Pastilhas e discos de freio', dica: 'Chiado ou pedal baixo pedem revisão imediata.' },
  { id: 'm5', titulo: 'Filtro de ar e de combustível', dica: 'Entupido aumenta consumo e reduz desempenho.' },
  { id: 'm6', titulo: 'Fluido de arrefecimento', dica: 'Nível baixo pode causar superaquecimento.' },
  { id: 'm7', titulo: 'Bateria', dica: 'Dura em média de 2 a 4 anos. Teste antes de falhar.' },
  { id: 'm8', titulo: 'Correia dentada / de acessórios', dica: 'Troca no intervalo do fabricante evita danos graves ao motor.' },
];
 
const LUZES = [
  { id: 'l1', cor: C.vermelho, nome: 'Pressão do óleo', sig: 'Pare em local seguro e desligue o motor. Rodar assim pode fundir o motor.' },
  { id: 'l2', cor: C.vermelho, nome: 'Temperatura do motor', sig: 'Superaquecimento. Pare, aguarde esfriar e não abra a tampa do reservatório quente.' },
  { id: 'l3', cor: C.vermelho, nome: 'Freio / freio de mão', sig: 'Freio de mão acionado ou nível do fluido baixo. Verifique antes de seguir.' },
  { id: 'l4', cor: C.vermelho, nome: 'Bateria / alternador', sig: 'Sistema de carga com falha. Vá a uma oficina sem demora.' },
  { id: 'l5', cor: C.faixa, nome: 'Injeção eletrônica (check engine)', sig: 'Falha no motor ou emissões. Faça o diagnóstico em breve.' },
  { id: 'l6', cor: C.faixa, nome: 'ABS', sig: 'O freio comum funciona, mas sem o antitravamento. Revise.' },
  { id: 'l7', cor: C.faixa, nome: 'Pressão dos pneus', sig: 'Algum pneu está fora da pressão. Calibre e confira se há furo.' },
  { id: 'l8', cor: C.vermelho, nome: 'Airbag', sig: 'Falha no sistema de airbag. Ele pode não abrir em uma colisão.' },
  { id: 'l9', cor: C.verde, nome: 'Farol alto / luzes ligadas', sig: 'Apenas informativa: indica função ativa.' },
];
 
const DICAS = [
  'Pneus calibrados reduzem o consumo e aumentam a segurança.',
  'Mantenha 3 segundos de distância do carro da frente, e 5 na chuva.',
  'Arranques bruscos e freadas fortes gastam mais combustível.',
  'Faça a revisão no prazo: a garantia pode depender disso.',
  'Cheque o estepe e o macaco antes de viajar.',
  'Ar-condicionado em velocidade baixa pesa menos que vidro aberto em alta.',
];
 
const Linha = ({ rotulo, valor }) => (
  <View style={s.linha}>
    <Text style={s.linhaRotulo}>{rotulo}</Text>
    <Text style={s.linhaValor}>{valor}</Text>
  </View>
);
 
/* ---------- Telas ---------- */
function Inicio({ irPara }) {
  const dica = useMemo(() => DICAS[new Date().getDate() % DICAS.length], []);
  return (
    <ScrollView contentContainerStyle={s.tela}>
      <View style={s.heroi}>
        <View style={s.faixaLinha} />
        <Text style={s.heroiTitulo}>Entenda seu carro antes que ele fale com você.</Text>
        <Text style={s.heroiTexto}>Catálogo, manutenção, luzes do painel e contas de consumo em um só lugar.</Text>
      </View>
 
      <View style={s.cartaoDica}>
        <Text style={s.cartaoDicaTitulo}>Dica de hoje</Text>
        <Text style={s.cartaoDicaTexto}>{dica}</Text>
      </View>
 
      <Text style={s.secao}>O que você precisa agora?</Text>
      {[
        ['carros', 'Comparar carros', 'Hatch, sedã, SUV e elétricos'],
        ['manut', 'Revisão em dia', 'Checklist com progresso'],
        ['painel', 'Acendeu uma luz?', 'Descubra o que ela significa'],
        ['calc', 'Calcular consumo', 'Km por litro e custo por km'],
      ].map(([id, t, d]) => (
        <TouchableOpacity key={id} style={s.atalho} onPress={() => irPara(id)} activeOpacity={0.7}>
          <View style={{ flex: 1 }}>
            <Text style={s.atalhoTitulo}>{t}</Text>
            <Text style={s.atalhoDesc}>{d}</Text>
          </View>
          <Text style={s.seta}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
 
function Carros() {
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Todos');
  const [sel, setSel] = useState(null);
 
  const lista = CARROS.filter(
    (c) => (tipo === 'Todos' || c.tipo === tipo) &&
      c.nome.toLowerCase().includes(busca.trim().toLowerCase())
  );
 
  return (
    <View style={{ flex: 1 }}>
      <View style={s.topoBusca}>
        <TextInput
          style={s.input}
          placeholder="Buscar modelo"
          placeholderTextColor={C.aco}
          value={busca}
          onChangeText={setBusca}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          {TIPOS.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTipo(t)}
              style={[s.chip, tipo === t && s.chipAtivo]}
            >
              <Text style={[s.chipTxt, tipo === t && s.chipTxtAtivo]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
 
      <FlatList
        data={lista}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingTop: 6 }}
        ListEmptyComponent={
          <Text style={s.vazio}>Nenhum carro encontrado. Tente outro nome ou filtro.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={s.carro} onPress={() => setSel(item)} activeOpacity={0.7}>
            <View style={{ flex: 1 }}>
              <Text style={s.carroNome}>{item.nome}</Text>
              <Text style={s.carroSub}>{item.motor}</Text>
            </View>
            <View style={s.selo}><Text style={s.seloTxt}>{item.tipo}</Text></View>
          </TouchableOpacity>
        )}
      />
 
      <Modal visible={!!sel} animationType="slide" transparent onRequestClose={() => setSel(null)}>
        <View style={s.fundoModal}>
          <View style={s.modal}>
            {sel && (
              <>
                <Text style={s.modalTitulo}>{sel.nome}</Text>
                <Text style={s.modalObs}>{sel.obs}</Text>
                <Linha rotulo="Categoria" valor={sel.tipo} />
                <Linha rotulo="Motor" valor={sel.motor} />
                <Linha rotulo="Consumo / autonomia" valor={sel.consumo} />
                <Linha rotulo="Porta-malas" valor={sel.portaMalas} />
                <Text style={s.nota}>Valores aproximados. Confirme com o fabricante.</Text>
              </>
            )}
            <TouchableOpacity style={s.botao} onPress={() => setSel(null)}>
              <Text style={s.botaoTxt}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
 
function Manutencao() {
  const [feitos, setFeitos] = useState({});
  const total = MANUTENCAO.length;
  const ok = Object.values(feitos).filter(Boolean).length;
  const pct = Math.round((ok / total) * 100);
 
  return (
    <ScrollView contentContainerStyle={s.tela}>
      <View style={s.progressoCaixa}>
        <Text style={s.progressoNum}>{pct}%</Text>
        <Text style={s.progressoTxt}>{ok} de {total} itens em dia</Text>
        <View style={s.barraFundo}>
          <View style={[s.barra, { width: `${pct}%` }]} />
        </View>
      </View>
 
      {MANUTENCAO.map((m) => {
        const marcado = !!feitos[m.id];
        return (
          <TouchableOpacity
            key={m.id}
            style={s.item}
            activeOpacity={0.7}
            onPress={() => setFeitos((f) => ({ ...f, [m.id]: !f[m.id] }))}
          >
            <View style={[s.caixa, marcado && s.caixaMarcada]}>
              {marcado && <Text style={s.check}>✓</Text>}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.itemTitulo, marcado && s.riscado]}>{m.titulo}</Text>
              <Text style={s.itemDica}>{m.dica}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={s.botaoSec} onPress={() => setFeitos({})}>
        <Text style={s.botaoSecTxt}>Limpar checklist</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
 
function Painel() {
  const [aberta, setAberta] = useState(null);
  return (
    <ScrollView contentContainerStyle={s.tela}>
      <Text style={s.explica}>
        Vermelho: pare assim que for seguro. Amarelo: procure uma oficina em breve. Verde: informativa.
      </Text>
      {LUZES.map((l) => (
        <TouchableOpacity
          key={l.id}
          style={s.luz}
          activeOpacity={0.7}
          onPress={() => setAberta(aberta === l.id ? null : l.id)}
        >
          <View style={s.luzTopo}>
            <View style={[s.bolinha, { backgroundColor: l.cor }]} />
            <Text style={s.luzNome}>{l.nome}</Text>
            <Text style={s.seta}>{aberta === l.id ? '⌄' : '›'}</Text>
          </View>
          {aberta === l.id && <Text style={s.luzSig}>{l.sig}</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
 
function Calculadora() {
  const [km, setKm] = useState('');
  const [litros, setLitros] = useState('');
  const [preco, setPreco] = useState('');
  const [etanol, setEtanol] = useState('');
  const [gasolina, setGasolina] = useState('');
 
  const n = (v) => parseFloat(String(v).replace(',', '.'));
  const kml = n(km) > 0 && n(litros) > 0 ? n(km) / n(litros) : null;
  const custoKm = kml && n(preco) > 0 ? n(preco) / kml : null;
  const razao = n(etanol) > 0 && n(gasolina) > 0 ? n(etanol) / n(gasolina) : null;
 
  return (
    <ScrollView contentContainerStyle={s.tela} keyboardShouldPersistTaps="handled">
      <Text style={s.secao}>Consumo do seu carro</Text>
      <TextInput style={s.input} placeholder="Km rodados no tanque" placeholderTextColor={C.aco} keyboardType="decimal-pad" value={km} onChangeText={setKm} />
      <TextInput style={[s.input, s.gap]} placeholder="Litros abastecidos" placeholderTextColor={C.aco} keyboardType="decimal-pad" value={litros} onChangeText={setLitros} />
      <TextInput style={[s.input, s.gap]} placeholder="Preço por litro (R$)" placeholderTextColor={C.aco} keyboardType="decimal-pad" value={preco} onChangeText={setPreco} />
      <View style={s.resultado}>
        <Text style={s.resRotulo}>Consumo médio</Text>
        <Text style={s.resValor}>{kml ? `${kml.toFixed(1)} km/l` : '—'}</Text>
        <Text style={s.resRotulo}>Custo por km</Text>
        <Text style={s.resValor}>{custoKm ? `R$ ${custoKm.toFixed(2)}` : '—'}</Text>
      </View>
 
      <Text style={[s.secao, { marginTop: 24 }]}>Etanol ou gasolina?</Text>
      <TextInput style={s.input} placeholder="Preço do etanol (R$)" placeholderTextColor={C.aco} keyboardType="decimal-pad" value={etanol} onChangeText={setEtanol} />
      <TextInput style={[s.input, s.gap]} placeholder="Preço da gasolina (R$)" placeholderTextColor={C.aco} keyboardType="decimal-pad" value={gasolina} onChangeText={setGasolina} />
      <View style={s.resultado}>
        <Text style={s.resRotulo}>Relação etanol/gasolina</Text>
        <Text style={s.resValor}>{razao ? `${Math.round(razao * 100)}%` : '—'}</Text>
        {razao && (
          <Text style={s.veredito}>
            {razao <= 0.7 ? 'Etanol compensa (até 70%).' : 'Gasolina compensa (acima de 70%).'}
          </Text>
        )}
        <Text style={s.nota}>Regra geral dos 70%. Varia conforme o carro.</Text>
      </View>
    </ScrollView>
  );
}
 
/* ---------- App ---------- */
const ABAS = [
  { id: 'inicio', nome: 'Início' },
  { id: 'carros', nome: 'Carros' },
  { id: 'manut', nome: 'Revisão' },
  { id: 'painel', nome: 'Painel' },
  { id: 'calc', nome: 'Contas' },
];
const TITULOS = {
  inicio: 'Painel Auto', carros: 'Catálogo', manut: 'Manutenção',
  painel: 'Luzes do painel', calc: 'Calculadoras',
};
 
export default function App() {
  const [aba, setAba] = useState('inicio');
  return (
    <SafeAreaView style={s.raiz}>
      <StatusBar barStyle="light-content" backgroundColor={C.asfalto} />
      <View style={s.cabecalho}>
        <Text style={s.cabTitulo}>{TITULOS[aba]}</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: C.papel }}>
        {aba === 'inicio' && <Inicio irPara={setAba} />}
        {aba === 'carros' && <Carros />}
        {aba === 'manut' && <Manutencao />}
        {aba === 'painel' && <Painel />}
        {aba === 'calc' && <Calculadora />}
      </View>
      <View style={s.abas}>
        {ABAS.map((a) => (
          <TouchableOpacity key={a.id} style={s.aba} onPress={() => setAba(a.id)}>
            <View style={[s.abaMarca, aba === a.id && { backgroundColor: C.faixa }]} />
            <Text style={[s.abaTxt, aba === a.id && s.abaTxtAtiva]}>{a.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
 
const s = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: C.asfalto, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  cabecalho: { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: C.asfalto },
  cabTitulo: { color: C.branco, fontSize: 24, fontWeight: '800', letterSpacing: 0.3 },
  tela: { padding: 16, paddingBottom: 32 },
 
  heroi: { backgroundColor: C.asfalto, borderRadius: 6, padding: 20, marginBottom: 16 },
  faixaLinha: { width: 56, height: 6, backgroundColor: C.faixa, marginBottom: 16 },
  heroiTitulo: { color: C.branco, fontSize: 24, fontWeight: '800', lineHeight: 30 },
  heroiTexto: { color: '#C4CAD0', fontSize: 15, lineHeight: 22, marginTop: 10 },
 
  cartaoDica: { backgroundColor: C.faixa, borderRadius: 6, padding: 16, marginBottom: 20 },
  cartaoDicaTitulo: { fontWeight: '800', color: C.asfalto, fontSize: 14, marginBottom: 4 },
  cartaoDicaTexto: { color: C.asfalto, fontSize: 16, lineHeight: 22 },
 
  secao: { fontSize: 18, fontWeight: '800', color: C.asfalto, marginBottom: 10 },
  atalho: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.branco, padding: 16, borderRadius: 6, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: C.asfalto },
  atalhoTitulo: { fontSize: 16, fontWeight: '700', color: C.asfalto },
  atalhoDesc: { fontSize: 13, color: C.aco, marginTop: 2 },
  seta: { fontSize: 24, color: C.aco, marginLeft: 8 },
 
  topoBusca: { padding: 16, paddingBottom: 8 },
  input: { backgroundColor: C.branco, borderRadius: 6, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, color: C.asfalto, borderWidth: 1, borderColor: '#D9DCDF' },
  gap: { marginTop: 10 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: C.branco, borderWidth: 1, borderColor: '#D9DCDF', marginRight: 8 },
  chipAtivo: { backgroundColor: C.asfalto, borderColor: C.asfalto },
  chipTxt: { color: C.asfalto, fontWeight: '600' },
  chipTxtAtivo: { color: C.faixa },
 
  carro: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.branco, padding: 16, borderRadius: 6, marginBottom: 10 },
  carroNome: { fontSize: 17, fontWeight: '700', color: C.asfalto },
  carroSub: { fontSize: 13, color: C.aco, marginTop: 2 },
  selo: { backgroundColor: C.grafite, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  seloTxt: { color: C.faixa, fontSize: 12, fontWeight: '700' },
  vazio: { textAlign: 'center', color: C.aco, marginTop: 32, fontSize: 15 },
 
  fundoModal: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.55)' },
  modal: { backgroundColor: C.papel, padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  modalTitulo: { fontSize: 24, fontWeight: '800', color: C.asfalto },
  modalObs: { fontSize: 15, color: C.grafite, lineHeight: 22, marginVertical: 10 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#DCDDD8' },
  linhaRotulo: { color: C.aco, fontSize: 14 },
  linhaValor: { color: C.asfalto, fontSize: 14, fontWeight: '700', flexShrink: 1, textAlign: 'right', marginLeft: 12 },
  nota: { color: C.aco, fontSize: 12, marginTop: 10 },
  botao: { backgroundColor: C.asfalto, padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 16 },
  botaoTxt: { color: C.faixa, fontWeight: '800', fontSize: 16 },
  botaoSec: { padding: 14, alignItems: 'center', marginTop: 8 },
  botaoSecTxt: { color: C.vermelho, fontWeight: '700' },
 
  progressoCaixa: { backgroundColor: C.asfalto, borderRadius: 6, padding: 20, marginBottom: 16 },
  progressoNum: { color: C.faixa, fontSize: 40, fontWeight: '800' },
  progressoTxt: { color: '#C4CAD0', fontSize: 14, marginBottom: 12 },
  barraFundo: { height: 8, backgroundColor: C.grafite, borderRadius: 4, overflow: 'hidden' },
  barra: { height: 8, backgroundColor: C.faixa },
  item: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: C.branco, padding: 14, borderRadius: 6, marginBottom: 10 },
  caixa: { width: 26, height: 26, borderRadius: 4, borderWidth: 2, borderColor: C.aco, marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  caixaMarcada: { backgroundColor: C.verde, borderColor: C.verde },
  check: { color: C.branco, fontWeight: '800' },
  itemTitulo: { fontSize: 16, fontWeight: '700', color: C.asfalto },
  riscado: { textDecorationLine: 'line-through', color: C.aco },
  itemDica: { fontSize: 13, color: C.aco, marginTop: 2, lineHeight: 18 },
 
  explica: { color: C.grafite, fontSize: 14, lineHeight: 20, marginBottom: 14 },
  luz: { backgroundColor: C.branco, padding: 14, borderRadius: 6, marginBottom: 10 },
  luzTopo: { flexDirection: 'row', alignItems: 'center' },
  bolinha: { width: 16, height: 16, borderRadius: 8, marginRight: 12 },
  luzNome: { flex: 1, fontSize: 16, fontWeight: '700', color: C.asfalto },
  luzSig: { marginTop: 10, color: C.grafite, fontSize: 14, lineHeight: 20 },
 
  resultado: { backgroundColor: C.asfalto, borderRadius: 6, padding: 16, marginTop: 12 },
  resRotulo: { color: '#C4CAD0', fontSize: 13, marginTop: 4 },
  resValor: { color: C.faixa, fontSize: 28, fontWeight: '800' },
  veredito: { color: C.branco, fontSize: 15, fontWeight: '700', marginTop: 8 },
 
  abas: { flexDirection: 'row', backgroundColor: C.asfalto, paddingBottom: Platform.OS === 'ios' ? 8 : 0 },
  aba: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  abaMarca: { width: 28, height: 4, borderRadius: 2, backgroundColor: 'transparent', marginBottom: 6 },
  abaTxt: { color: C.aco, fontSize: 12, fontWeight: '600' },
  abaTxtAtiva: { color: C.branco },
});
