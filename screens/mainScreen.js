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
import * as fetchImages from '../actions/fetchPage';
export class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        page: 1,
        images: [],
        isFetching: true,
        error: false
      };
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
    if (!this.state.isFetching) return null;

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
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.props.fetchImages();
      }
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        isFetching: true
      },
      () => {
        this.props.fetchImages();
      }
    );
  };

  componentDidMount() {
    this.props.fetchImages();
  }

  renderFlatListItem(item) {
    const { navigate } = this.props.navigation;
    return(
      <TouchableOpacity onPress={() => navigate('Photo', { user: item.user.username, image_url:item.urls.full })} style={styles.container}>
        <Image
          source={{uri: item.urls.small}} style={styles.photo}
        />
        <View style={{alignItems: 'flex-start', marginBottom: 10, marginLeft: 10}}>
          <Text style={styles.photoName}>{item.alt_description}</Text>
          <Text style={styles.userName}>{item.user.username}</Text>
        </View>
      </TouchableOpacity>

    )
  }

  render() {
    
    return (
      <View>
        <FlatList style = {{backgroundColor: '#fff'}}
          data={this.state.photos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => this.renderFlatListItem(item)}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
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
function mapStateToProps(state) {
    return {
        images: state.images,
        page:state.page,
        isFetching:state.isFetching,
        error:state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchImages }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);