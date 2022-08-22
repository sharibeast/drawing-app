import { Point, Stroke } from './types';

export const UNDO = 'UNDO';
export const REDO = 'REDO';
export const BEGIN_STROKE = 'BEGIN_STROKE';
export const UPDATE_STROKE = 'UPDATE_STROKE';
export const END_STROKE = 'END_STROKE';
export const SET_STROKE_COLOR = 'SET_STROKE_COLOR';

export type HistoryIndexAction =
  | { type: typeof UNDO; payload: number }
  | { type: typeof REDO }
  | { type: typeof END_STROKE; payload: { stroke: Stroke; historyLimit: number } };

export const undo = (undoLimit: number) => ({
  type: UNDO,
  payload: undoLimit,
});

export const redo = () => ({ type: REDO });

export type Action =
  | {
      type: typeof BEGIN_STROKE;
      payload: Point;
    }
  | {
      type: typeof UPDATE_STROKE;
      payload: Point;
    }
  | {
      type: typeof END_STROKE;
    }
  | {
      type: typeof SET_STROKE_COLOR;
      payload: string;
    };

/* actio creators */

export const beginStroke = (x: number, y: number) => ({ type: BEGIN_STROKE, payload: { x, y } });
export const updateStroke = (x: number, y: number) => ({ type: UPDATE_STROKE, payload: { x, y } });
export const endStroke = () => ({ type: END_STROKE });
export const setStrokeColor = (color: string) => ({ type: SET_STROKE_COLOR, payload: color });
