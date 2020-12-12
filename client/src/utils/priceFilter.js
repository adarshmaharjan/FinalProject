function priceFiltering(data, min, max) {
    console.log(data, min, max);
    var filtered = data.filter(function (post) {
        if (post.price <= max && post.price >= min) {
            return post;
        }
    });
    return mergeSort(filtered);
}

function mergeSort(Arr) {
    if (Arr.length == 1) {
        return Arr;
    } else if (Arr.length == 2) {
        if (Arr[0].price > Arr[1].price) {
            return [Arr[1], Arr[0]];
        } else {
            return Arr;
        }
    }

    var p = parseInt(Arr.length / 2);
    var m1 = mergeSort(Arr.slice(0, p));
    var m2 = mergeSort(Arr.slice(p));

    var ret = [];

    while (1) {
        if (m1.length > 0 && m2.length > 0) {
            if (m1[0].price <= m2[0].price) {
                ret.push(m1[0]);
                m1 = m1.slice(1);
            } else {
                ret.push(m2[0]);
                m2 = m2.slice(1);
            }
        } else if (m1.length > 0) {
            ret = ret.concat(m1);
            m1 = [];
        } else if (m2.length > 0) {
            ret = ret.concat(m2);
            m2 = [];
        } else {
            break;
        }
    }

    return ret;
}

export default priceFiltering;
