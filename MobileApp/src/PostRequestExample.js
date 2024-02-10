import React from 'react'; 
import { Text, View } from 'react-native'; 
import PostRequestExample from './components/PostRequestExample'; 
  


const PostExample = () => { 

    const requestOptions = { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ postName: photoInfo }) 
    }; 

    const postExample = async () => { 
        try { 
            await fetch( 
                'http://143.215.101.170:5000/base64', requestOptions) 
                .then(response => { 
                    response.json() 
                        .then(data => { 
                            Alert.alert("Post created at : ",  
                            data.createdAt); 
                        }); 
                }) 
        } 
        catch (error) { 
            console.error(error); 
        } 
    } 

    return ( 
        <View style={styles.btn}> 
            <Button mode="contained" onPress={postExample} > 
                Click to make a Post request</Button> 
        </View> 
    ); 
}; 
  
export default PostExample;