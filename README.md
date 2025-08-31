# react-modal-component-by-jeremy

# Documentation du composant

## Introduction

`react-modal-component-by-jeremy` est un composant React réutilisable permettant d'afficher des modales **accessibles**, **stylisées** et **contrôlables**, avec différents types d’alertes.

## Prérequis

-   **Node.js** : `>= 16.0.0`
-   **React** : `>= 17.0.0` (compatible 17.x, 18.x, 19.x)
-   **Éditeur recommandé** : [VS Code](https://code.visualstudio.com/)

## Installation

```sh
npm install react-modal-component-by-jeremy@latest
```

ou

```sh
yarn add react-modal-component-by-jeremy@latest
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

---

## Props disponibles

| Nom                   | Type         | Par défaut | Description                                                                               |
| --------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------- |
| `isOpen`              | `boolean`    | —          | Affiche la modale quand `true`.                                                           |
| `onClose`             | `() => void` | —          | Fonction appelée à la demande de fermeture (bouton/Échap/overlay selon config).           |
| `title`               | `string`     | —          | Titre affiché dans l’en-tête de la modale.                                                |
| `children`            | `ReactNode`  | —          | Contenu de la modale (texte, composants React, etc.).                                     |
| `type`                | `string`     | —          | Type visuel : `"success"`, `"error"`, `"info"`, **`"warning"`**.                          |
| `closeOnEsc`          | `boolean`    | `true`     | Si `false`, **désactive** la fermeture via la touche **Échap**.                           |
| `closeOnOverlayClick` | `boolean`    | `true`     | Si `false`, **désactive** la fermeture au **clic sur l’overlay**.                         |
| `hideCloseButton`     | `boolean`    | `false`    | Si `true`, **masque** le bouton de fermeture (utile pour forcer une action avant sortie). |

**TypeScript (déclaration) :**

```ts
export interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    title: string;
    type: "success" | "error" | "info" | "warning";
    closeOnEsc?: boolean;
    closeOnOverlayClick?: boolean;
    hideCloseButton?: boolean;
}
```

> ℹ️ Les nouvelles props d’ergonomie te permettent de **contrôler finement** quand et comment l’utilisateur peut fermer la modale.

---

## Types de modale & icônes intégrées

-   `success` → icône `CheckCircle`
-   `error` → icône `ErrorIcon`
-   `info` → icône `InfoCircle`
-   `warning` → style/usage d’avertissement (tu peux surcharger le CSS si besoin)

> Tu peux personnaliser l’apparence du type `warning` via ton CSS (cf. section suivante).

---

## Personnalisation CSS

Les styles par défaut sont dans `react-modal-component.css`. Tu peux les surcharger :

```css
/* Exemple : style spécifique pour warning */
.modal-content.warning {
    background: rgba(255, 193, 7, 0.5); /* jaune translucide */
}
.modal-content.warning .modal-title {
    color: #8a6d00;
}
```

Autre exemple (padding sur le contenu interne) :

```css
.modal-inner_content {
    padding: 20px !important;
}
```

---

## Accessibilité

-   **Focus trap** : la navigation au clavier est **confinée** dans la modale (Tab/Shift+Tab).
-   **Raccourci Échap** : la fermeture avec `Escape` est **activable/désactivable** via `closeOnEsc`.
-   **Overlay** : la fermeture au clic overlay est **activable/désactivable** via `closeOnOverlayClick`.
-   **ARIA** : `aria-labelledby` / `aria-describedby` sont gérés pour améliorer l’accessibilité.

---

## Exemples avancés

### 1) Avertissement (`type="warning"`) avec blocage Échap & overlay

```jsx
<Modal
    isOpen={isOpen}
    onClose={handleClose}
    type="warning"
    title="Attention"
    closeOnEsc={false}
    closeOnOverlayClick={false}
>
    <p>Merci de lire attentivement avant de poursuivre.</p>
</Modal>
```

### 2) Forcer l’utilisateur à compléter une action avant fermeture

Cas d’usage : **imposer la saisie d’un pseudo** (username) avant de fermer.

```jsx
import React, { useMemo } from "react";
import Modal from "react-modal-component-by-jeremy";

export function ForcedUsernameModal({ isOpen, userName, onClose, onChange }) {
    const canClose = useMemo(
        () => !!userName && userName.trim().length > 0,
        [userName]
    );

    const handleClose = () => {
        if (!canClose) return; // Refuser la fermeture si pseudo vide
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Mon pseudo public"
            type="info"
            closeOnEsc={false}
            closeOnOverlayClick={false}
            hideCloseButton={!canClose} // Masquer le bouton X tant que pseudo vide
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleClose();
                }}
            >
                <label>
                    Pseudo :
                    <input
                        value={userName}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </label>
                <button type="submit" disabled={!canClose}>
                    Valider
                </button>
            </form>

            {!canClose && (
                <p className="mt-2 text-xs text-red-600">
                    Choisis un pseudo pour continuer. La modale restera ouverte
                    tant que le champ est vide.
                </p>
            )}
        </Modal>
    );
}
```

---

## Bonnes pratiques

-   **Contrôle** : garde le state `isOpen` dans le parent et passe une fonction `onClose` qui respecte tes règles métier.
-   **Ergonomie** : si tu bloques la fermeture (`closeOnEsc={false}` / `closeOnOverlayClick={false}`), **explique** toujours pourquoi à l’utilisateur (message d’aide).
-   **Accessibilité** : évite de piéger les utilisateurs dans une modale sans issue. Fournis une **action claire** pour terminer (ex. bouton “Valider” qui satisfait la condition).

---

## Contribution

Les contributions sont bienvenues ! Forke le projet et ouvre une Pull Request.

---

## Licence

MIT — fais-en bon usage ✨

---

### Changelog (récapitulatif des ajouts)

-   **Nouveau type** : `warning`
-   **Nouvelles props** :

    -   `closeOnEsc` : contrôle la fermeture via Échap
    -   `closeOnOverlayClick` : contrôle la fermeture au clic overlay
    -   `hideCloseButton` : masque le bouton “X” de fermeture

> Ces ajouts permettent de bâtir des **modales à contraintes fortes** (par ex. forcer un champ requis) tout en respectant l’accessibilité.
