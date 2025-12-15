import './styles.css';
import { BoardUI } from "./BoardUI.js";

const board = new BoardUI();
document.body.innerHTML = board.render()