import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';

export class XRPWalletConnect {
  connector: WalletConnect | null = null;

  constructor() {
    this.connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org',
    });

    if (!this.connector.connected) {
      this.connector.createSession().then(() => {
        QRCodeModal.open(this.connector?.uri || '', () => {});
      });
    }

    this.connector.on('connect', (error, payload) => {
      if (error) throw error;
      console.log('Connected:', payload);
    });

    this.connector.on('disconnect', () => {
      console.log('Disconnected');
      this.connector = null;
    });
  }

  async disconnect() {
    if (this.connector?.connected) {
      await this.connector.killSession();
    }
  }
}
