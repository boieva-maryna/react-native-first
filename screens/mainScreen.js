import React, {Component} from 'react';
import {
  View, 
  Button, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchImages} from '../actions/fetchPage';
export class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Images List',
  };

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "74%",
          marginLeft: "23%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.props.isFetching) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleLoadMore = () =>{
    console.log(this.props.images.length);
    if(this.props.isFetching) return;
    let {page} =this.props;
    this.props.fetchImagesDispatch(page+1);
  };

  componentDidMount() {
    const {page} =this.props;
    this.props.fetchImagesDispatch(page);
  }

  renderFlatListItem(item) {
    const { navigate } = this.props.navigation;
    return(
      <TouchableOpacity onPress={() => navigate('Photo', { user: item.user.username, image_url:item.urls.full })} style={styles.container}>
        <Image
          source={{uri: item.urls.small}} style={styles.photo}
        />
        <View style={{alignItems: 'flex-start', marginBottom: 10, marginLeft: 10}}>
          <Text style={styles.photoName}>{item.description!==null?item.description:item.alt_description}</Text>
          <Text style={styles.userName}>{item.user.username}</Text>
        </View>
      </TouchableOpacity>

    )
  }

  render() {
    return (
      <View>
        <FlatList style = {{backgroundColor: '#fff'}}
          data={this.props.images}
          keyExtractor={(item) => item.id+this.props.page}
          renderItem={({item}) => this.renderFlatListItem(item)}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.01}
          initialNumToRender={10}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 5,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 5,
    // paddingBottom: 5,
    paddingLeft: 5,
    width: "100%"
  },
  photo: {
    height: 60,
    width: 60
  },
  photoName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  userName: {
    color: 'rgba(0,0,0,.4)',
  }
});
const mapStateToProps=(state) =>({
    images:state.imagesReducer.images,
    isFetching: state.imagesReducer.isFetching,
    error: state.imagesReducer.error,
    page:state.imagesReducer.page
})

function mapDispatchToProps(dispatch) {
    return {
        fetchImagesDispatch:(page)=>dispatch(fetchImages(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
