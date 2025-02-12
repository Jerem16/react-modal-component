# react-modal-component-by-jeremy

# Documentation du composant :

## Introduction

`react-modal-component-by-jeremy` est un composant React réutilisable permettant d'afficher des modales accessibles et stylisées avec différents types d'alertes.

## Installation

```sh
npm install react-modal-component-by-jeremy@latest
```

```sh
yarn add react-modal-component-by-jeremy@lasted
```

## Utilisation

### Importation

```jsx
import Modal from "react-modal-component-by-jeremy";
```

### Exemple de base

```jsx
import React, { useState } from "react";
import Modal from "react-modal-component-by-jeremy";

const App = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Ouvrir la modale</button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                type="info"
                title="Titre de la modale"
            >
                <p>Contenu personnalisé de la modale</p>
            </Modal>
        </div>
    );
};

export default App;
```

## Props

| Nom        | Type     | Description                                                                                        |
| ---------- | -------- | -------------------------------------------------------------------------------------------------- |
| `isOpen`   | `bool`   | Détermine si la modale est affichée ou non.                                                        |
| `onClose`  | `func`   | Fonction de fermeture de la modale.                                                                |
| `title`    | `string` | Titre affiché dans la modale.                                                                      |
| `children` | `node`   | Contenu personnalisé de la modale (peut inclure du texte, des composants React, des images, etc.). |
| `type`     | `string` | Type de modale (`"success"`, `"error"`, `"info"`).                                                 |

## Accessibilité

-   La navigation au clavier est gérée (fermeture avec `Escape`, focus piégé dans la modale).
-   `aria-labelledby` et `aria-describedby` sont utilisés pour améliorer l'accessibilité.

## Icônes intégrées

Le composant inclut des icônes SVG pour les types de modale :

-   `CheckCircle` pour `success`
-   `ErrorIcon` pour `error`
-   `InfoCircle` pour `info`

## Personnalisation CSS

Les styles par défaut sont définis dans `react-modal-component.css`. Vous pouvez les surcharger selon vos besoins.

Par exemple, si vous rencontrez un problème de padding lié aux polices, vous pouvez ajouter la règle CSS suivante :

```css
.modal-inner_content {
    padding: 20px !important;
}
```

## Contribution

Les contributions sont les bienvenues ! Forkez le projet et soumettez une pull request sur [GitHub](https://github.com/Jerem16/react-modal-component).

## Licence

Ce projet est sous licence MIT.
