function AddTwoVectors(vec1, vec2){
    let vec = {};
    vec.x = vec1.x + vec2.x;
    vec.y = vec1.y + vec2.y;

    return vec;
}


module.exports.AddTwoVectors = AddTwoVectors;