require 'rails_helper'

describe MessagesController do
  # letは複数のexampledで
  # 同一のインスタンス使う時に用いる
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do
# ログインしている場合
# endまでの３点条件
    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end
      # @messageがある確認
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end
      # @groupがある確認
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end
      # 該当するビューにいけているか
      it 'renders index' do
        expect(response).to render_template :index
      end
    end
  # ログインしていない場合
  # 下記１点が条件
    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end
      # 該当するビューにリダイレクトできているか
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
# ここから違う処理
  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
# ログインしているか
    context 'log in' do
      before do
        login user
      end
# ちゃんと保存できているか
      context 'can save' do
        subject {
          post :create,
          params: params
        }
      #  メッセージの保存はできているか
        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end
      # 意図してビューにいけているか
        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
# ログインしているが保存できていない
      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }
        # メッセージの保存はできなかったか
        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end
        #意図したビューにいけているか
        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end
# ログインしていない場合
    context 'not log in' do
      # 意図した画面にリダイレクトできているか
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
end