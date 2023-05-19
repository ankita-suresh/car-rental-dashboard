import { useEffect, useReducer, useState } from 'react';

import { projectFirestore, timestamp } from '../firebase/config';

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null };
        case 'ADDED_DOCUMENT':
            return {
                ...state,
                isPending: false,
                document: action.payload,
                success: true,
                error: null,
            };
        case 'ERROR':
            return {
                ...state,
                isPending: false,
                document: null,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

// eslint-disable-next-line import/prefer-default-export
export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    const ref = projectFirestore.collection(collection);

    const dispatchIfNotCancelled = (action) => {
        dispatch(action);
    };

    const addDocument = async (doc) => {
        dispatch({
            type: 'IS_PENDING',
        });
        try {
            const createdAt = timestamp.fromDate(new Date());
            console.log(doc);
            const addedDocument = await ref.add({ doc });

            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        } catch (err) {
            console.log(err);
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
        }
    };

    const deleteDocument = (id) => {};

    useEffect(() => () => setIsCancelled(true));

    return { addDocument, deleteDocument, response };
};
