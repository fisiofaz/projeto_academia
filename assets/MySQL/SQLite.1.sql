CREATE TABLE cadastro (
  id SERIAL PRIMARY KEY,
  username VARCHAR(16) NOT NULL UNIQUE,
  email VARCHAR(50) NOT NULL,
  senha VARCHAR(24) NOT NULL,
  confirma_senha VARCHAR(24) NOT NULL
);

-- Tabela de compra (Compra)
CREATE TABLE compra (
  id SERIAL PRIMARY KEY,
  card_items VARCHAR(100) NOT NULL, 
  addons_items VARCHAR(100) NOT NULL, 
  fk_id_cadastro INT NOT NULL, 
  CONSTRAINT fk_cadastro_compra FOREIGN KEY (fk_id_cadastro) REFERENCES cadastro(id) 
);

CREATE TABLE aula (
  id SERIAL PRIMARY KEY,
  name VARCHAR(24) NOT NULL,
  time INT NOT NULL
);

CREATE TABLE agendamento_aula (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  fk_id_cadastro INT NOT NULL,
  fk_id_compra INT NOT NULL,
  fk_id_aula INT NOT NULL,
  CONSTRAINT fk_cadastro_agendamento FOREIGN KEY (fk_id_cadastro) REFERENCES cadastro(id),
  CONSTRAINT fk_compra_agendamento FOREIGN KEY (fk_id_compra) REFERENCES compra(id),
  CONSTRAINT fk_aula_agendamento FOREIGN KEY (fk_id_aula) REFERENCES aula(id)
);

CREATE TABLE items_compra (
  id SERIAL PRIMARY KEY,
  card_items VARCHAR(100) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  fk_id_compra INT NOT NULL,
  CONSTRAINT fk_compra_itens FOREIGN KEY (fk_id_compra) REFERENCES compra(id)
);

CREATE TABLE addons (
  id SERIAL PRIMARY KEY,
  addons_items VARCHAR(100) NOT NULL,
  price DECIMAL(8,2) NOT NULL
);

CREATE TABLE adicionais_compra (
  id SERIAL PRIMARY KEY,
  fk_id_compra INT NOT NULL,
  fk_id_items_compra INT NOT NULL,
  fk_id_addons INT NOT NULL,
  CONSTRAINT fk_compra_adicionais FOREIGN KEY (fk_id_compra) REFERENCES compra(id),
  CONSTRAINT fk_items_compra_adicionais FOREIGN KEY (fk_id_items_compra) REFERENCES items_compra(id),
  CONSTRAINT fk_addons_adicionais FOREIGN KEY (fk_id_addons) REFERENCES addons(id)
);

-- Tabela de modalidade (Tipos de Aula)
CREATE TABLE modalidade (
  id SERIAL PRIMARY KEY,
  name VARCHAR(24) NOT NULL,
  time INT NOT NULL,
  date DATE NOT NULL,
  fk_id_agendamento_aula INT NOT NULL,
  CONSTRAINT fk_agendamento_aula_modalidade FOREIGN KEY (fk_id_agendamento_aula) REFERENCES agendamento_aula(id)
); 
