// get the query from the user which may include the type of property the user is searching for
// Initially extract the data from the database based on the price of the property
// Extract data based on the location of the search
// Extract the description of the the post of the array of data
// Enter the data in the content recommendation system
// map the data into an array based on recommendation

const ContentBasedRecommender = require("../utils/contentRecommendation");

const recommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 100
});

/**
 * recommend.
 *
 * @param {} data [Array of objects of information retrieved from the database of particular location]
 * @param {} req [object containing users preferences]
 */
const recommend = async (data, req) => {
    /**
     * stringify.
     *
     * @param {} value [individual object from array]
     */
    function stringify(value) {
        let filtered = Object.keys(value.facilities).filter(function (key) {
            return value.facilities[key];
        });
        let text = "";
        for (let i = 0; i < filtered.length; i++) {
            if (text === "") {
                text = text + filtered[i];
            } else {
                text = text + `, ${filtered[i]}`;
            }
        }
        return text;
    }

    var promise = new Promise((resolve, reject) => {
        let string1 = stringify(req);
        const documents = [
            {
                id: "1",
                content: `${req.preferences.bedroom} bedroom, ${req.preferences.kitchen} kitchen, ${req.preferences.toilet} toilet,${req.preferences.livingRoom} livingRoom in ${req.location}. It is ${req.furnished}. Facilities like ${string1} `
            }
        ];

        data.map(value => {
            let string = stringify(value);

            documents.push({
                id: value.id,
                content: `${value.rooms.bedroom} bedroom, ${value.rooms.kitchen}, ${value.rooms.toilet}, ${value.rooms.livingRoom} in ${value.location}. It is ${value.furnished} . Facilities like ${string}`
            });
        });
        resolve(documents);
    });
    promise
        .then(documents => {
            recommender.train(documents);
        })
        .then(() => {
            const similarDocuments = recommender.getSimilarDocuments(
                "1",
                0,
                10
            );
            
        });
    const documents = await promise; 
    recommender.train(documents)
    return(recommender.getSimilarDocuments("1",0,10))

};

module.exports = recommend;
