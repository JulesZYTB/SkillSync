/* CREATE DATABASE skillsync_db;
USE skillsync_db;
 */
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'collaborator') DEFAULT 'collaborator',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_skills (
    user_id INT,
    skill_id INT,
    level INT CHECK (level BETWEEN 1 AND 10),
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    owner_id INT,
    start_date DATE,
    end_date DATE,
    status ENUM('planned', 'active', 'completed', 'on_hold') DEFAULT 'planned',
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    assigned_to INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('todo', 'in_progress', 'review', 'done') DEFAULT 'todo',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    due_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
);


-- Insérer un administrateur par défaut (mdp : 123456!)
INSERT INTO users (full_name, email, password_hash, role) VALUES ('Administrateur', 'admin@exemple.com', '$2b$10$.bNetUivpEjzLilt8YAATeukRxcT3klHO6supSpG2s4Q4yiTzTKoC', 'admin');
INSERT INTO users (full_name, email, password_hash, role) VALUES ('Collaborateur', 'collaborateur@exemple.com', '$2b$10$.bNetUivpEjzLilt8YAATeukRxcT3klHO6supSpG2s4Q4yiTzTKoC', 'collaborator');
INSERT INTO users (full_name, email, password_hash, role) VALUES ('Manager', 'manager@exemple.com', '$2b$10$.bNetUivpEjzLilt8YAATeukRxcT3klHO6supSpG2s4Q4yiTzTKoC', 'manager');
