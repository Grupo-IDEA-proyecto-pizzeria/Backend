import admin from "./../config/firebase.js";

const db = admin.firestore();

export class DBUtils {
    constructor() {
        this.db = db;
    }

    async addElement(collectionName, data) {
        const docRef = await this.db.collection(collectionName).add(data);

        const id = docRef.id; 
        const dataWithId = { id: id, ...data };
        await docRef.set(dataWithId);

        return dataWithId;
    }

    async getElementById(collectionName, documentId) {
        const docRef = this.db.collection(collectionName).doc(documentId);
        const docSnapshot = await docRef.get();
        
        if (docSnapshot.exists) {
            return docSnapshot.data();
        } else {
            return null;
        }
    }

    async getElementsByField(collectionName, fieldName, fieldValue) {
        const querySnapshot = await this.db.collection(collectionName).where(fieldName, '==', fieldValue).get();
    
        const results = querySnapshot.docs.map(docSnapshot => ({
            id: docSnapshot.id,
            ...docSnapshot.data(),
        }));

        return results.length > 0 ? results : null;
    }

    async getElementsByFieldWithPagination(collectionName, fieldName, fieldValue, pageSize, startAfterDocId = null) {
        let query = this.db.collection(collectionName).where(fieldName, '==', fieldValue);
    
        if (startAfterDocId) {
            const startAfterDoc = await this.db.collection(collectionName).doc(startAfterDocId).get();
            query = query.startAfter(startAfterDoc);
        }
    
        const querySnapshot = await query.limit(pageSize).get();
        // const totalResults = (await this.db.collection(collectionName).where(fieldName, '==', fieldValue).get()).size;
    
        const results = querySnapshot.docs.map(docSnapshot => ({
            id: docSnapshot.id,
            ...docSnapshot.data(),
        }));
        // const results = querySnapshot.docs.map(docSnapshot => docSnapshot.data());

        const metadata = {
            totalResults: querySnapshot.size,
            // results: totalResults,
            pageSize: pageSize,
        };
    
        return {
            data: results.length > 0 ? results : null,
            metadata: metadata,
        };
    }

    async updateElement(collectionName, documentId, newData) {
        const docRef = this.db.collection(collectionName).doc(documentId);
        await docRef.update(newData);
    }

    async deleteElement(collectionName, documentId) {
        const docRef = this.db.collection(collectionName).doc(documentId);
        await docRef.delete();
    }
    
}
