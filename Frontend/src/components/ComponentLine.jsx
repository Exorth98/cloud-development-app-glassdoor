import { ResponsiveLine } from '@nivo/line'

const MyResponsiveLine = ({data}) => {
    var viewData = {
        averageByRating: [{"id":"average", "data": []}]
    }
    function transformData(data){ 
        data.sort((a, b) => (a._id > b._id) ? 1 : -1)  
        let  myData = {};
        data.map((row)=>{
            myData = {};
            myData['x'] = row._id;
            //myData['y'] = (Math.round(row['average:']*100)/100);
            myData['y'] = (row['average:']).toFixed(2);
            viewData.averageByRating[0].data.push(myData);
        })
        
    }
    transformData(data);
    console.log(viewData);
    return(

        <div className="line">
        <ResponsiveLine
            data={viewData.averageByRating}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Number of stars',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Average salary',
                legendOffset: -50,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
    
            />
    
    </div>
    )

}
export default MyResponsiveLine;