import React, { PureComponent } from 'react';
// UI 组件
import { ListItem, ListInfo, LoadMore } from '../style';
// 数据管理
import { connect } from 'react-redux';
import { actionCreators } from '../store';
// 路由跳转 link组件可直接跳转
import { Link } from 'react-router-dom';

class List extends PureComponent {
	render() {
		// 解构赋值 减少代码冗余
		const { list, getMoreList, page } = this.props;
		return (
			<div>
				{
					// 常见的数组循环
					list.map((item, index) => {
						return (
							// 动态路由获取参数 
							// 因为用了immutable所以要用get()方法去取值
							<Link key={index}  to={'/detail/' + item.get('id')}>
								<ListItem >
									<img alt='' className='pic' src={item.get('imgUrl')} />
									<ListInfo>
										<h3 className='title'>{item.get('title')}</h3>
										<p className='desc'>{item.get('desc')}</p>
									</ListInfo>
								</ListItem>
							</Link>
						);
					})
				}
				<LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>
			</div>
		)
	}
}

const mapState = (state) => ({
	list: state.getIn(['home', 'articleList']),
	page: state.getIn(['home', 'articlePage'])
});

const mapDispatch = (dispatch) => ({
	getMoreList(page) {
		dispatch(actionCreators.getMoreList(page))
	}
})

export default connect(mapState, mapDispatch)(List);