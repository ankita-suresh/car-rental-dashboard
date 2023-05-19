import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';
// eslint-disable-next-line import/prefer-default-export
export const useCollection = (collection, _query) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const query = useRef(_query);
    useEffect(() => {
        const ref = projectFirestore.collection(collection);

        // if (query) {
        //     ref = ref.where(...query);
        // }
        const unsubscribe = ref.onSnapshot(
            (snapshot) => {
                const results = [];
                snapshot.docs.forEach((doc) => {
                    results.push({ ...doc.data(), id: doc.id });
                });

                setDocuments(results);
                setError(null);
            },
            // eslint-disable-next-line no-shadow
            (error) => {
                console.log(error);
                setError('could not fetch the data');
            }
        );

        return () => unsubscribe();
    }, [collection, query]);
    return { documents, error };
};
