import xrpl from 'xrpl';
import { XRP_MAINNET_RPC } from '../constants';

export const xrpClient = new xrpl.Client(XRP_MAINNET_RPC);
