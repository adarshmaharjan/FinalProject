// const Posts = ({ posts, loading }) => {
//     if (loading) {
//         return <h2>Loading....</h2>;
//     }

//     return (
//         <ul className="list-group">
//             {posts.map((post) => (
//                 <li key={post.id} className="list-group-item">
//                     {post.title}
//                 </li>
//             ))}
//         </ul>
//     );
// };
    //
    


{posts.map((post) => (
                <div className="post-container" key={post._id}>
                    <img
                        src="https://res.cloudinary.com/ds6o6pq2w/image/upload/v1605053164/images/5a29a9fb-036f-4ff8-8378-9ac24ce9697d.png"
                        alt="#"
                    />
                    <div>
                        <h3>{post.title}</h3>
                        <div>
                            <label htmlFor="facilities">Facility</label>
                            <ul>
                                {post.facilities.map((facility, index) => (
                                    <li key={index}>{facility}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="price">
                            <span>{post.price}</span>
                        </div>
                        <div className="detail">
                            <Link to={"/detail/" + post._id}>Details</Link>
                        </div>
                    </div>
                </div>
            ))}



