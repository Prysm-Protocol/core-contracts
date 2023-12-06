import { getContractAddress, getContractFactory } from '@/scripts/utils'
import { CCIPAdapter__factory } from '@/typechain'
import { ethers } from 'hardhat'

export async function deployCCIPAdapterFixture(
  bridgeAddress: string,
  accessManagementAddress: string,
  adapterRouterAddress: string,
  feeTokenAddress?: string
) {
  const CCIPAdapter =
    await getContractFactory<CCIPAdapter__factory>('CCIPAdapter')

  const erc20OrNative = feeTokenAddress || ethers.ZeroAddress

  const ccipAdapter = await CCIPAdapter.deploy(
    bridgeAddress,
    accessManagementAddress,
    adapterRouterAddress,
    erc20OrNative
  )
  const ccipAdapterAddress = await getContractAddress(ccipAdapter)

  return { ccipAdapter, ccipAdapterAddress }
}
