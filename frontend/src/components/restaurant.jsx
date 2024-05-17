export default function Restaurant({data}) {
    return(
        <div className="restaurant">
            <div className="restaurant-header"><p>{data.restaurant_name}</p></div>
            <div className="restaurant-data">
                <div>Borough: {data.borough}</div>
                <div>Cuisine: {data.cuisine}</div>
                <div>Grade: {data.grade}</div>
                <div>Grade Date: {data.grade_date}</div>
                <div>Restaurant ID: {data.restaurant_id}</div>
                <div>Score: {data.score}</div>
                <div>Violation Code: {data.violation_code}</div>
                <div>Violation Description: {data.violation_description}</div>
                <div>Zipcode: {data.zipcode}</div>
            </div>
        </div>
    );
}